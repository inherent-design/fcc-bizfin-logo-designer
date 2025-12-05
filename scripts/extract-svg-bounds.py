#!/usr/bin/env python3
"""Extract bounding boxes and centers from SVG elements."""

import re
import xml.etree.ElementTree as ET
from pathlib import Path

def parse_viewbox(viewbox_str):
    """Parse viewBox string to get x, y, width, height."""
    parts = viewbox_str.split()
    return {
        'x': float(parts[0]),
        'y': float(parts[1]),
        'width': float(parts[2]),
        'height': float(parts[3])
    }

def get_path_bounds(path_data):
    """Get approximate bounding box from path data by finding absolute coordinates."""
    # This is a simplified parser that extracts coordinate pairs
    # It looks for M (moveto) and line/curve commands with explicit coordinates

    x_coords = []
    y_coords = []

    # Track current position for relative commands
    current_x, current_y = 0, 0

    # Split path into commands
    # Match commands (letter) followed by their parameters (numbers)
    pattern = r'([MmLlHhVvCcSsQqTtAaZz])([\d\s,.-]*)'
    commands = re.findall(pattern, path_data)

    for cmd, params in commands:
        if not params.strip():
            continue

        # Extract numbers from parameters
        numbers = [float(n) for n in re.findall(r'-?\d+\.?\d*', params)]

        if cmd == 'M':  # Absolute moveto
            if len(numbers) >= 2:
                current_x, current_y = numbers[0], numbers[1]
                x_coords.append(current_x)
                y_coords.append(current_y)

        elif cmd == 'm':  # Relative moveto
            if len(numbers) >= 2:
                current_x += numbers[0]
                current_y += numbers[1]
                x_coords.append(current_x)
                y_coords.append(current_y)

        elif cmd in ['L', 'T']:  # Absolute lineto
            for i in range(0, len(numbers), 2):
                if i + 1 < len(numbers):
                    current_x, current_y = numbers[i], numbers[i + 1]
                    x_coords.append(current_x)
                    y_coords.append(current_y)

        elif cmd in ['l', 't']:  # Relative lineto
            for i in range(0, len(numbers), 2):
                if i + 1 < len(numbers):
                    current_x += numbers[i]
                    current_y += numbers[i + 1]
                    x_coords.append(current_x)
                    y_coords.append(current_y)

        elif cmd == 'H':  # Absolute horizontal lineto
            for num in numbers:
                current_x = num
                x_coords.append(current_x)
                y_coords.append(current_y)

        elif cmd == 'h':  # Relative horizontal lineto
            for num in numbers:
                current_x += num
                x_coords.append(current_x)
                y_coords.append(current_y)

        elif cmd == 'V':  # Absolute vertical lineto
            for num in numbers:
                current_y = num
                x_coords.append(current_x)
                y_coords.append(current_y)

        elif cmd == 'v':  # Relative vertical lineto
            for num in numbers:
                current_y += num
                x_coords.append(current_x)
                y_coords.append(current_y)

        elif cmd in ['C', 'S', 'Q']:  # Absolute curve commands
            for i in range(0, len(numbers), 2):
                if i + 1 < len(numbers):
                    x_coords.append(numbers[i])
                    y_coords.append(numbers[i + 1])
            if len(numbers) >= 2:
                current_x = numbers[-2]
                current_y = numbers[-1]

        elif cmd in ['c', 's', 'q']:  # Relative curve commands
            for i in range(0, len(numbers), 2):
                if i + 1 < len(numbers):
                    x = current_x + numbers[i]
                    y = current_y + numbers[i + 1]
                    x_coords.append(x)
                    y_coords.append(y)
            if len(numbers) >= 2:
                current_x += numbers[-2]
                current_y += numbers[-1]

    if not x_coords or not y_coords:
        return None

    return {
        'min_x': min(x_coords),
        'max_x': max(x_coords),
        'min_y': min(y_coords),
        'max_y': max(y_coords),
        'width': max(x_coords) - min(x_coords),
        'height': max(y_coords) - min(y_coords),
        'center_x': (min(x_coords) + max(x_coords)) / 2,
        'center_y': (min(y_coords) + max(y_coords)) / 2
    }

def analyze_svg_file(filepath):
    """Analyze an SVG file and extract positioning info."""
    tree = ET.parse(filepath)
    root = tree.getroot()

    # Get viewBox
    viewbox_str = root.get('viewBox')
    viewbox = parse_viewbox(viewbox_str) if viewbox_str else None

    # Find all path elements
    paths = []
    for path in root.iter('{http://www.w3.org/2000/svg}path'):
        path_id = path.get('id', 'unnamed')
        path_data = path.get('d', '')
        if path_data:
            bounds = get_path_bounds(path_data)
            if bounds:
                paths.append({
                    'id': path_id,
                    'bounds': bounds
                })

    # Check for rect elements (like in dollar-sign)
    rects = []
    for rect in root.iter('{http://www.w3.org/2000/svg}rect'):
        x = float(rect.get('x', 0))
        y = float(rect.get('y', 0))
        width = float(rect.get('width', 0))
        height = float(rect.get('height', 0))

        # Only include non-zero rects (skip fill:none rects)
        if width > 0 and height > 0 and rect.get('style', '') != 'fill: none;':
            rects.append({
                'x': x,
                'y': y,
                'width': width,
                'height': height,
                'center_x': x + width / 2,
                'center_y': y + height / 2
            })

    return {
        'viewbox': viewbox,
        'paths': paths,
        'rects': rects
    }

def main():
    svg_dir = Path('/Users/zer0cell/production/fcc-biz-fin-club/development/logo-designer/src/assets/svg')

    elements = [
        'briefcase.svg',
        'sierra-nevada.svg',
        'dollar-sign.svg',
        'grape-leaf.svg',
        'handshake.svg',
        'base.svg',
        'quadrant-tl.svg',
        'quadrant-br.svg'
    ]

    print("SVG Element Analysis")
    print("=" * 80)

    for element_name in elements:
        filepath = svg_dir / element_name
        if not filepath.exists():
            print(f"\n❌ {element_name}: File not found")
            continue

        print(f"\n📄 {element_name}")
        print("-" * 80)

        result = analyze_svg_file(filepath)

        if result['viewbox']:
            vb = result['viewbox']
            print(f"ViewBox: {vb['x']} {vb['y']} {vb['width']} {vb['height']}")

        if result['rects']:
            print(f"\nRectangles found: {len(result['rects'])}")
            for i, rect in enumerate(result['rects'], 1):
                print(f"  Rect {i}:")
                print(f"    Position: ({rect['x']:.3f}, {rect['y']:.3f})")
                print(f"    Size: {rect['width']:.3f} x {rect['height']:.3f}")
                print(f"    ✨ Center: ({rect['center_x']:.3f}, {rect['center_y']:.3f})")

        if result['paths']:
            print(f"\nPaths found: {len(result['paths'])}")
            for path_info in result['paths']:
                bounds = path_info['bounds']
                print(f"  Path '{path_info['id']}':")
                print(f"    Bounds: X[{bounds['min_x']:.3f} to {bounds['max_x']:.3f}], Y[{bounds['min_y']:.3f} to {bounds['max_y']:.3f}]")
                print(f"    Size: {bounds['width']:.3f} x {bounds['height']:.3f}")
                print(f"    ✨ Center: ({bounds['center_x']:.3f}, {bounds['center_y']:.3f})")

if __name__ == '__main__':
    main()
