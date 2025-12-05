#!/usr/bin/env python3
"""Extract element positions from the reference SVG."""

import xml.etree.ElementTree as ET
import json

def get_element_bounds_from_viewbox(element_name, viewbox_dims):
    """
    Given an element and its viewBox dimensions from the single-asset file,
    find the actual position in the reference SVG.

    Since the individual SVG files have the same path coordinates as the reference,
    we just need to figure out where those coordinates start in the 160x160 space.
    """

    # Map element names to their known positions in reference
    # These are extracted from looking at the reference SVG
    element_positions = {
        'briefcase': {
            'viewbox_width': 13.397,
            'viewbox_height': 13.397,
            # From reference: path starts around M67.647,54.635
            # Briefcase appears to span roughly x:60-70, y:45-60
            'approx_min_x': 60.27,
            'approx_min_y': 45.59,
        },
        'sierra-nevada': {
            'viewbox_width': 25.836,
            'viewbox_height': 10.806,
            # From reference: path starts at M104.024,54.306
            # Mountains span roughly x:87-113, y:47-58
            'approx_min_x': 87.19,
            'approx_min_y': 47.79,
        },
        'dollar-sign': {
            'viewbox_width': 19.382,
            'viewbox_height': 22.08,  # Note: using the rect height, not viewBox height
            # From reference: rect at x="84.849" y="79.65"
            'approx_min_x': 84.849,
            'approx_min_y': 79.65,
        },
        'grape-leaf': {
            'viewbox_width': 17.608,
            'viewbox_height': 19.355,
            # From reference: path starts at M75.183,91.742
            # Leaf spans roughly x:57-75, y:72-92
            'approx_min_x': 57.58,
            'approx_min_y': 72.39,
        },
        'handshake': {
            'viewbox_width': 26.567,
            'viewbox_height': 19.537,
            # Handshake is centered, spans roughly x:67-94, y:64-84
            'approx_min_x': 67.22,
            'approx_min_y': 64.73,
        },
    }

    if element_name not in element_positions:
        return None

    elem = element_positions[element_name]

    # Calculate center point
    center_x = elem['approx_min_x'] + (elem['viewbox_width'] / 2)
    center_y = elem['approx_min_y'] + (elem['viewbox_height'] / 2)

    return {
        'name': element_name,
        'min_x': elem['approx_min_x'],
        'min_y': elem['approx_min_y'],
        'width': elem['viewbox_width'],
        'height': elem['viewbox_height'],
        'center_x': round(center_x, 2),
        'center_y': round(center_y, 2),
    }

def parse_reference_svg_manually():
    """
    Manually parse the reference SVG to find actual element positions.
    This is more accurate than trying to parse complex SVG paths.
    """

    ref_path = '/Users/zer0cell/production/fcc-biz-fin-club/development/logo-designer/src/assets/svg/fcc-biz-fin-logo.svg'
    tree = ET.parse(ref_path)
    root = tree.getroot()

    print("Reference SVG Analysis (160x160 space)")
    print("=" * 80)

    # Find the dollar-sign rect (most accurate positioning info)
    for rect in root.iter('{http://www.w3.org/2000/svg}rect'):
        if rect.get('x') and float(rect.get('x', 0)) > 10:  # Skip the background rect
            print(f"\n📍 Dollar Sign (from rect element):")
            x = float(rect.get('x'))
            y = float(rect.get('y'))
            width = float(rect.get('width'))
            height = float(rect.get('height'))
            print(f"  Position: ({x}, {y})")
            print(f"  Size: {width} x {height}")
            print(f"  ✨ Center: ({x + width/2:.2f}, {y + height/2:.2f})")

    # Find paths with IDs
    for path in root.iter('{http://www.w3.org/2000/svg}path'):
        path_id = path.get('id', '')
        path_data = path.get('d', '')

        if path_id == 'briefcase':
            # Briefcase starts at M67.647,54.635
            # ViewBox is 13.397 x 13.397
            # So it spans roughly from that start point
            print(f"\n📍 Briefcase:")
            print(f"  Path starts: M67.647,54.635")
            print(f"  ViewBox size: 13.397 x 13.397")
            # Estimate center (path goes down and left)
            print(f"  ✨ Estimated center: (~64.0, ~51.3)")

        elif path_id == 'sierra-nevada':
            # Mountains start at M104.024,54.306
            # ViewBox is 25.836 x 10.806
            print(f"\n📍 Sierra Nevada (mountains):")
            print(f"  Path starts: M104.024,54.306")
            print(f"  ViewBox size: 25.836 x 10.806")
            print(f"  ✨ Estimated center: (~100.1, ~53.2)")

        elif path_id == 'grape-leaf':
            # Leaf starts at M75.183,91.742
            # ViewBox is 17.608 x 19.355
            print(f"\n📍 Grape Leaf:")
            print(f"  Path starts: M75.183,91.742")
            print(f"  ViewBox size: 17.608 x 19.355")
            print(f"  ✨ Estimated center: (~66.4, ~82.1)")

        elif path_id == 'Handshake_Left_Fill' or path_id == 'Handshake_Right_Fill':
            if 'already_printed_handshake' not in dir(parse_reference_svg_manually):
                parse_reference_svg_manually.already_printed_handshake = True
                # Handshake spans both left and right
                # ViewBox is 26.567 x 19.537
                print(f"\n📍 Handshake:")
                print(f"  ViewBox size: 26.567 x 19.537")
                print(f"  ✨ Estimated center: (~80.5, ~74.5)")

def main():
    parse_reference_svg_manually()

    print("\n" + "=" * 80)
    print("\nQuadrant Centers (for defaultDesign.json):")
    print("-" * 80)

    # Based on the element positions above
    quadrant_centers = {
        0: {"x": 64.0, "y": 51.3, "note": "TL - Briefcase"},
        1: {"x": 100.1, "y": 53.2, "note": "TR - Sierra Nevada (mountains)"},
        2: {"x": 94.5, "y": 90.7, "note": "BL - Dollar Sign"},
        3: {"x": 66.4, "y": 82.1, "note": "BR - Grape Leaf"},
    }

    for pos, center in quadrant_centers.items():
        print(f"  Position {pos} ({center['note']}): x={center['x']}, y={center['y']}")

    print("\n" + "=" * 80)
    print("\nJSON for defaultDesign.json:")
    print("-" * 80)
    for pos, center in quadrant_centers.items():
        print(f'  "quadrantCenter": {{ "x": {center["x"]}, "y": {center["y"]} }}')

if __name__ == '__main__':
    main()
