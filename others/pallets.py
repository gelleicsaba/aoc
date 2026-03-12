def calculate_number_of_pallets(number_of_boxes, box_width, box_depth, box_height,
                                 box_weight, pallet_width, pallet_depth,
                                 max_pallet_weight, max_pallet_height):
    # Calculate how many boxes fit on one pallet based on dimensions
    boxes_per_row = pallet_width // box_width
    boxes_per_column = pallet_depth // box_depth
    boxes_per_layer = max_pallet_height // box_height

    # Total boxes that can fit on one pallet based on dimensions
    boxes_per_pallet_by_dimensions = boxes_per_row * boxes_per_column * boxes_per_layer

    # Calculate how many boxes can be loaded on a pallet based on weight
    boxes_per_pallet_by_weight = max_pallet_weight // box_weight

    # The number of boxes per pallet is the smaller of the two constraints
    boxes_per_pallet = min(boxes_per_pallet_by_dimensions, boxes_per_pallet_by_weight)

    # If no boxes can fit on a pallet, return 0
    if boxes_per_pallet <= 0:
        return 0

    # Calculate the number of pallets needed
    number_of_pallets = (number_of_boxes + boxes_per_pallet - 1) // boxes_per_pallet  # Ceiling division

    return number_of_pallets

# Example usage
number_of_boxes = 100  # Total number of boxes
box_width = 40         # in centimeters
box_depth = 30         # in centimeters
box_height = 20        # in centimeters
box_weight = 10        # in kilograms
pallet_width = 120     # in centimeters
pallet_depth = 100     # in centimeters
max_pallet_weight = 600  # in kilograms
max_pallet_height = 160  # in centimeters

pallets_needed = calculate_number_of_pallets(
    number_of_boxes, box_width, box_depth, box_height,
    box_weight, pallet_width, pallet_depth, max_pallet_weight, max_pallet_height
)

print(f"Number of pallets needed: {pallets_needed}")
