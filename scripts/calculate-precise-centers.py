#!/usr/bin/env python3
"""Calculate precise element centers using viewBox dimensions and path start points."""

def main():
    print("Precise Element Center Calculations")
    print("=" * 80)
    print("\nMethod: Using viewBox dimensions + visual inspection of path bounds\n")

    # Dollar Sign - EXACT from rect element
    print("📍 Dollar Sign (Position 2 - BR)")
    dollar_x = 84.849
    dollar_y = 79.65
    dollar_width = 19.382
    dollar_height = 22.08
    dollar_center_x = dollar_x + (dollar_width / 2)
    dollar_center_y = dollar_y + (dollar_height / 2)
    print(f"  Rect: x={dollar_x}, y={dollar_y}")
    print(f"  Size: {dollar_width} x {dollar_height}")
    print(f"  ✨ CENTER: ({dollar_center_x:.3f}, {dollar_center_y:.3f})")

    # Briefcase - path starts at M67.647,54.635
    # Looking at the path, it goes up (v1.005), has elements at lower y
    # ViewBox is 13.397 x 13.397
    # Path minimum Y is around 45.59 (based on 60.27 -> 48.271 difference of ~12)
    # Path maximum would be around 45.59 + 13.397 = 58.987
    print("\n📍 Briefcase (Position 0 - TL)")
    briefcase_path_start_x = 67.647
    briefcase_path_start_y = 54.635
    briefcase_width = 13.397
    briefcase_height = 13.397
    # The path data shows values going down to around y=45-46
    # and the briefcase spans about 13.4 units
    briefcase_min_y = 45.591  # Estimated from 48.271 - 2.68
    briefcase_min_x = 59.608  # Estimated from 67.647 - 8.039
    briefcase_center_x = briefcase_min_x + (briefcase_width / 2)
    briefcase_center_y = briefcase_min_y + (briefcase_height / 2)
    print(f"  Path starts: M{briefcase_path_start_x},{briefcase_path_start_y}")
    print(f"  Estimated bounds: x≈{briefcase_min_x:.3f}, y≈{briefcase_min_y:.3f}")
    print(f"  Size: {briefcase_width} x {briefcase_height}")
    print(f"  ✨ CENTER: ({briefcase_center_x:.3f}, {briefcase_center_y:.3f})")

    # Sierra Nevada (mountains) - path starts at M104.024,54.306
    # ViewBox is 25.836 x 10.806
    # The mountains go left from start point
    # Estimated left edge around 87.19
    print("\n📍 Sierra Nevada / Mountains (Position 1 - TR)")
    sierra_path_start_x = 104.024
    sierra_path_start_y = 54.306
    sierra_width = 25.836
    sierra_height = 10.806
    # Mountains appear to end at the right around where they start
    # So left edge is approximately start_x - width
    sierra_max_x = 113.055  # Visual estimate of rightmost point
    sierra_min_x = sierra_max_x - sierra_width
    sierra_max_y = 58.109  # Visual estimate of bottom
    sierra_min_y = sierra_max_y - sierra_height
    sierra_center_x = sierra_min_x + (sierra_width / 2)
    sierra_center_y = sierra_min_y + (sierra_height / 2)
    print(f"  Path starts: M{sierra_path_start_x},{sierra_path_start_y}")
    print(f"  Estimated bounds: x≈{sierra_min_x:.3f}, y≈{sierra_min_y:.3f}")
    print(f"  Size: {sierra_width} x {sierra_height}")
    print(f"  ✨ CENTER: ({sierra_center_x:.3f}, {sierra_center_y:.3f})")

    # Grape Leaf - path starts at M75.183,91.742
    # ViewBox is 17.608 x 19.355
    # Leaf appears to go left and down from start
    print("\n📍 Grape Leaf (Position 3 - BL)")
    leaf_path_start_x = 75.183
    leaf_path_start_y = 91.742
    leaf_width = 17.608
    leaf_height = 19.355
    # Leaf starts near top-right of its bounding box
    leaf_max_x = 75.183  # Path starts at right edge
    leaf_min_x = leaf_max_x - leaf_width
    leaf_min_y = 72.387  # 91.742 is near top, subtracting height
    leaf_max_y = leaf_min_y + leaf_height
    leaf_center_x = leaf_min_x + (leaf_width / 2)
    leaf_center_y = leaf_min_y + (leaf_height / 2)
    print(f"  Path starts: M{leaf_path_start_x},{leaf_path_start_y}")
    print(f"  Estimated bounds: x≈{leaf_min_x:.3f}, y≈{leaf_min_y:.3f}")
    print(f"  Size: {leaf_width} x {leaf_height}")
    print(f"  ✨ CENTER: ({leaf_center_x:.3f}, {leaf_center_y:.3f})")

    # Handshake - this is the reference center point
    # Looking at the reference SVG, handshake paths start around x=75, y=67
    # ViewBox is 26.567 x 19.537
    print("\n📍 Handshake (Reference center)")
    handshake_width = 26.567
    handshake_height = 19.537
    # From the paths, left hand starts around 67-75, right hand around 81-93
    # Y ranges from about 64 to 84
    handshake_min_x = 67.22
    handshake_max_x = handshake_min_x + handshake_width
    handshake_min_y = 64.73
    handshake_max_y = handshake_min_y + handshake_height
    handshake_center_x = handshake_min_x + (handshake_width / 2)
    handshake_center_y = handshake_min_y + (handshake_height / 2)
    print(f"  Estimated bounds: x≈{handshake_min_x:.3f}, y≈{handshake_min_y:.3f}")
    print(f"  Size: {handshake_width} x {handshake_height}")
    print(f"  ✨ CENTER: ({handshake_center_x:.3f}, {handshake_center_y:.3f})")

    print("\n" + "=" * 80)
    print("\n🎯 FINAL QUADRANT CENTERS")
    print("-" * 80)

    centers = [
        (0, "TL", "Briefcase", briefcase_center_x, briefcase_center_y),
        (1, "TR", "Sierra Nevada", sierra_center_x, sierra_center_y),
        (2, "BL", "Dollar Sign", dollar_center_x, dollar_center_y),
        (3, "BR", "Grape Leaf", leaf_center_x, leaf_center_y),
    ]

    for pos, label, name, cx, cy in centers:
        print(f"Position {pos} ({label} - {name}): {{ x: {cx:.2f}, y: {cy:.2f} }}")

    print("\n" + "=" * 80)
    print("\n📋 Copy-paste for defaultDesign.json:")
    print("-" * 80)
    print("[")
    for i, (pos, label, name, cx, cy) in enumerate(centers):
        comma = "," if i < len(centers) - 1 else ""
        print(f'  {{ "quadrantCenter": {{ "x": {cx:.2f}, "y": {cy:.2f} }} }}{comma}  // Position {pos} - {name}')
    print("]")

if __name__ == '__main__':
    main()
