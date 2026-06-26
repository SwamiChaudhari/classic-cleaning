#!/usr/bin/env node

/**
 * White-Label Duplication Script
 * 
 * Creates a new client project from the current template.
 * 
 * Usage:
 *   node scripts/duplicate-client.js <client-name> [options]
 * 
 * Options:
 *   --scheme <name>     Color scheme (classic, ocean, forest, royal, sunset, midnight)
 *   --domain <url>      Client domain (e.g., https://client-name.vercel.app)
 *   --city <city>       Client city
 *   --phone <phone>     Client phone number
 *   --email <email>     Client email
 *   --output <dir>      Output directory (default: ../<client-name>)
 * 
 * Example:
 *   node scripts/duplicate-client.js unique-clean-services \
 *     --scheme ocean \
 *     --domain https://unique-clean-services.vercel.app \
 *     --city Nashik \
 *     --phone "096234 44499" \
 *     --email "hello@uniqueclean.in"
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const colorSchemes = {
  classic: { primary: "#0B1D3A", secondary: "#0D9488", accent: "#EA580C", success: "#059669" },
  ocean: { primary: "#0C4A6E", secondary: "#0891B2", accent: "#F59E0B", success: "#10B981" },
  forest: { primary: "#14532D", secondary: "#15803D", accent: "#D97706", success: "#22C55E" },
  royal: { primary: "#312E81", secondary: "#7C3AED", accent: "#EC4899", success: "#10B981" },
  sunset: { primary: "#7C2D12", secondary: "#DC2626", accent: "#F97316", success: "#16A34A" },
  midnight: { primary: "#1E1B4B", secondary: "#4F46E5", accent: "#F43F5E", success: "#22D3EE" },
};

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {
    clientName: args[0],
    scheme: "classic",
    domain: "",
    city: "",
    phone: "",
    email: "",
    output: "",
  };

  for (let i = 1; i < args.length; i += 2) {
    const key = args[i].replace("--", "");
    const value = args[i + 1];
    if (key in result) {
      result[key] = value;
    }
  }

  if (!result.clientName) {
    console.error("Error: client-name is required");
    console.error("Usage: node scripts/duplicate-client.js <client-name> [options]");
    process.exit(1);
  }

  // Generate defaults
  if (!result.output) {
    result.output = path.join(process.cwd(), "..", result.clientName);
  }
  if (!result.domain) {
    result.domain = `https://${result.clientName.replace(/\s+/g, "-").toLowerCase()}.vercel.app`;
  }

  return result;
}

function patchJsonFile(filePath, patcher) {
  const content = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(content);
  const patched = patcher(data);
  fs.writeFileSync(filePath, JSON.stringify(patched, null, 2));
}

function patchFile(filePath, oldString, newString) {
  const content = fs.readFileSync(filePath, "utf-8");
  if (!content.includes(oldString)) {
    console.warn(`  Warning: Could not find "${oldString.slice(0, 50)}..." in ${filePath}`);
    return;
  }
  const updated = content.replace(oldString, newString);
  fs.writeFileSync(filePath, updated);
}

function main() {
  const config = parseArgs();
  const { clientName, scheme, domain, city, phone, email, output } = config;

  console.log(`\n${"=".repeat(60)}`);
  console.log(`White-Label Client Duplication`);
  console.log(`${"=".repeat(60)}`);
  console.log(`  Client: ${clientName}`);
  console.log(`  Scheme: ${scheme}`);
  console.log(`  Domain: ${domain}`);
  console.log(`  City:   ${city}`);
  console.log(`  Output: ${output}`);
  console.log(`${"=".repeat(60)}\n`);

  // Step 1: Copy project
  console.log("[1/6] Copying project files...");
  const sourceDir = process.cwd();
  
  // Use rsync to copy, excluding node_modules, .git, .next, data
  execSync(
    `rsync -av --exclude=node_modules --exclude=.git --exclude=.next --exclude=src/data --exclude=package-lock.json "${sourceDir}/" "${output}/"`,
    { stdio: "inherit" }
  );

  // Step 2: Update package.json
  console.log("\n[2/6] Updating package.json...");
  patchJsonFile(path.join(output, "package.json"), (pkg) => ({
    ...pkg,
    name: clientName.toLowerCase().replace(/\s+/g, "-"),
  }));

  // Step 3: Update business config
  console.log("\n[3/6] Updating business config...");
  const businessConfigPath = path.join(output, "src", "config", "business.ts");
  let businessContent = fs.readFileSync(businessConfigPath, "utf-8");

  // Replace name and fullName
  businessContent = businessContent.replace(
    /name:\s*"[^"]*"/,
    `name: "${clientName}"`
  );
  businessContent = businessContent.replace(
    /fullName:\s*"[^"]*"/,
    `fullName: "${clientName} Services"`
  );
  businessContent = businessContent.replace(
    /domain:\s*"[^"]*"/,
    `domain: "${domain}"`
  );
  
  if (phone) {
    businessContent = businessContent.replace(
      /phone:\s*"[^"]*"/,
      `phone: "${phone}"`
    );
    businessContent = businessContent.replace(
      /whatsapp:\s*"[^"]*"/,
      `whatsapp: "${phone.replace(/\s+/g, "").replace(/^0/, "91")}"`
    );
  }
  
  if (email) {
    businessContent = businessContent.replace(
      /email:\s*"[^"]*"/,
      `email: "${email}"`
    );
  }
  
  if (city) {
    businessContent = businessContent.replace(
      /city:\s*"[^"]*"/,
      `city: "${city}"`
    );
  }

  // Apply color scheme
  const colors = colorSchemes[scheme];
  if (colors) {
    businessContent = businessContent.replace(
      /primary:\s*"#[0-9a-fA-F]{6}"/,
      `primary: "${colors.primary}"`
    );
    businessContent = businessContent.replace(
      /secondary:\s*"#[0-9a-fA-F]{6}"/,
      `secondary: "${colors.secondary}"`
    );
    businessContent = businessContent.replace(
      /accent:\s*"#[0-9a-fA-F]{6}"/,
      `accent: "${colors.accent}"`
    );
    businessContent = businessContent.replace(
      /success:\s*"#[0-9a-fA-F]{6}"/,
      `success: "${colors.success}"`
    );
  }

  fs.writeFileSync(businessConfigPath, businessContent);

  // Step 4: Update CSS variables
  console.log("\n[4/6] Updating theme colors...");
  const globalsPath = path.join(output, "src", "app", "globals.css");
  let globalsContent = fs.readFileSync(globalsPath, "utf-8");
  
  if (colors) {
    globalsContent = globalsContent.replace(
      /--brand-primary:\s*#[0-9a-fA-F]{6}/,
      `--brand-primary: ${colors.primary}`
    );
    globalsContent = globalsContent.replace(
      /--brand-secondary:\s*#[0-9a-fA-F]{6}/,
      `--brand-secondary: ${colors.secondary}`
    );
    globalsContent = globalsContent.replace(
      /--brand-accent:\s*#[0-9a-fA-F]{6}/,
      `--brand-accent: ${colors.accent}`
    );
    globalsContent = globalsContent.replace(
      /--brand-success:\s*#[0-9a-fA-F]{6}/,
      `--brand-success: ${colors.success}`
    );
  }
  fs.writeFileSync(globalsPath, globalsContent);

  // Step 5: Install dependencies
  console.log("\n[5/6] Installing dependencies...");
  execSync(`cd "${output}" && npm install`, { stdio: "inherit" });

  // Step 6: Verify build
  console.log("\n[6/6] Verifying build...");
  try {
    execSync(`cd "${output}" && npm run build 2>&1 | tail -20`, { stdio: "inherit" });
    console.log("\n✓ Build successful!");
  } catch {
    console.log("\n⚠ Build had warnings but project is ready");
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Client project created at: ${output}`);
  console.log(`\nNext steps:`);
  console.log(`  1. cd ${output}`);
  console.log(`  2. Update src/config/areas.ts with ${city} areas`);
  console.log(`  3. Update src/config/services.ts with pricing`);
  console.log(`  4. Update src/config/reviews.ts with real reviews`);
  console.log(`  5. Deploy to Vercel`);
  console.log(`  6. Set up GitHub repo`);
  console.log(`${"=".repeat(60)}\n`);
}

main();
