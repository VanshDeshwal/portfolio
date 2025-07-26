#!/bin/bash

# Portfolio Build Script
# This script helps with development and deployment tasks

set -e

echo "🚀 Portfolio Build Script"
echo "========================"

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the portfolio root directory"
    exit 1
fi

# Function to check file sizes
check_file_sizes() {
    echo "📊 Checking file sizes..."
    
    # CSS files
    if [ -f "styles.css" ]; then
        css_size=$(wc -c < "styles.css")
        echo "  styles.css: ${css_size} bytes"
    fi
    
    if [ -f "assets/css/components.css" ]; then
        comp_size=$(wc -c < "assets/css/components.css")
        echo "  components.css: ${comp_size} bytes"
    fi
    
    if [ -f "assets/css/animations.css" ]; then
        anim_size=$(wc -c < "assets/css/animations.css")
        echo "  animations.css: ${anim_size} bytes"
    fi
    
    # JavaScript files
    if [ -f "script.js" ]; then
        js_size=$(wc -c < "script.js")
        echo "  script.js: ${js_size} bytes"
    fi
    
    # HTML file
    if [ -f "index.html" ]; then
        html_size=$(wc -c < "index.html")
        echo "  index.html: ${html_size} bytes"
    fi
}

# Function to validate HTML structure
validate_structure() {
    echo "🔍 Validating HTML structure..."
    
    # Check for required elements
    if grep -q "<title>" index.html; then
        echo "  ✅ Title tag found"
    else
        echo "  ❌ Title tag missing"
    fi
    
    if grep -q "viewport" index.html; then
        echo "  ✅ Viewport meta tag found"
    else
        echo "  ❌ Viewport meta tag missing"
    fi
    
    if grep -q "theme-toggle" index.html; then
        echo "  ✅ Theme toggle found"
    else
        echo "  ❌ Theme toggle missing"
    fi
}

# Function to check CSS structure
validate_css() {
    echo "🎨 Validating CSS structure..."
    
    if grep -q ":root" styles.css; then
        echo "  ✅ CSS custom properties found"
    else
        echo "  ❌ CSS custom properties missing"
    fi
    
    if grep -q "@media" styles.css; then
        echo "  ✅ Responsive styles found"
    else
        echo "  ❌ Responsive styles missing"
    fi
}

# Function to check JavaScript structure
validate_js() {
    echo "📜 Validating JavaScript structure..."
    
    if grep -q "class.*Manager" script.js; then
        echo "  ✅ Modular class structure found"
    else
        echo "  ❌ Modular class structure missing"
    fi
    
    if grep -q "addEventListener" script.js; then
        echo "  ✅ Event listeners found"
    else
        echo "  ❌ Event listeners missing"
    fi
}

# Function to optimize for production
optimize() {
    echo "⚡ Optimization suggestions:"
    echo "  • Consider minifying CSS and JavaScript for production"
    echo "  • Optimize images in assets/images/ directory"
    echo "  • Enable gzip compression on server"
    echo "  • Add Content-Delivery-Network (CDN) for better performance"
}

# Run all checks
case "${1:-all}" in
    "size")
        check_file_sizes
        ;;
    "html")
        validate_structure
        ;;
    "css")
        validate_css
        ;;
    "js")
        validate_js
        ;;
    "optimize")
        optimize
        ;;
    "all")
        check_file_sizes
        echo ""
        validate_structure
        echo ""
        validate_css
        echo ""
        validate_js
        echo ""
        optimize
        ;;
    *)
        echo "Usage: $0 [size|html|css|js|optimize|all]"
        exit 1
        ;;
esac

echo ""
echo "✅ Build script completed!"
echo "🌐 Ready for deployment at https://vanshdeshwal.dev"
