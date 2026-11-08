// Category-specific customization choices and add-on prices.
const choice = (label, price = 0) => ({ label, price });
export function customization(p) {
  const configs = {
    Burgers: {
      groups: [
        {
          name: "Bread",
          options: [
            choice("Brioche bun"),
            choice("Sesame bun"),
            choice("Lettuce wrap"),
          ],
        },
        {
          name: "Sauce",
          options: [
            choice("Ember sauce"),
            choice("Garlic mayo"),
            choice("Smoky BBQ"),
            choice("No sauce"),
          ],
        },
      ],
      extras: [
        choice("Extra beef patty", 4),
        choice("Extra cheddar", 1.5),
        choice("Caramelized onions", 1),
        choice("Pickles", 0.5),
      ],
      removals: ["No onions", "No pickles", "No cheese"],
    },
    Pizza: {
      groups: [
        {
          name: "Crust",
          options: [
            choice("Classic crust"),
            choice("Thin & crispy"),
            choice("Well baked"),
          ],
        },
        {
          name: "Finish",
          options: [
            choice("Classic"),
            choice("Chili oil"),
            choice("Extra basil"),
            choice("No basil"),
          ],
        },
      ],
      extras: [
        choice("Extra mozzarella", 2),
        choice("Mushrooms", 1.5),
        choice("Olives", 1),
        choice("Cherry tomatoes", 1),
      ],
      removals: ["No cheese", "No tomato sauce"],
    },
    Tacos: {
      groups: [
        {
          name: "Heat level",
          options: [choice("Mild"), choice("Medium"), choice("Hot")],
        },
        {
          name: "Sauce",
          options: [
            choice("Smoky crema"),
            choice("Garlic sauce"),
            choice("Chili sauce"),
            choice("Sauce on side"),
          ],
        },
      ],
      extras: [
        choice("Extra chicken", 3),
        choice("Guacamole", 2),
        choice("Extra slaw", 1),
        choice("Extra lime", 0.5),
      ],
      removals: ["No onions", "No slaw", "No crema"],
    },
    Pasta: {
      groups: [
        {
          name: "Pasta shape",
          options: [
            choice("Spaghetti"),
            choice("Penne"),
            choice("Tagliatelle"),
          ],
        },
        {
          name: "Finish",
          options: [
            choice("Classic"),
            choice("Extra herbs"),
            choice("Chili flakes"),
            choice("Sauce on side"),
          ],
        },
      ],
      extras: [
        choice("Grilled chicken", 3),
        choice("Extra parmesan", 1.5),
        choice("Mushrooms", 1.5),
        choice("Cherry tomatoes", 1),
      ],
      removals: ["No parmesan", "No pine nuts"],
    },
    Bowls: {
      groups: [
        {
          name: "Base",
          options: [
            choice("Mixed grains"),
            choice("Rice"),
            choice("Garden greens"),
          ],
        },
        {
          name: "Dressing",
          options: [
            choice("Lemon dressing"),
            choice("Sesame dressing"),
            choice("Dressing on side"),
            choice("No dressing"),
          ],
        },
      ],
      extras: [
        choice("Grilled chicken", 3),
        choice("Avocado", 2),
        choice("Extra vegetables", 1.5),
        choice("Extra grains", 1),
      ],
      removals: ["No sesame", "No onions"],
    },
    Wraps: {
      groups: [
        {
          name: "Bread",
          options: [
            choice("Classic flatbread"),
            choice("Whole-wheat wrap"),
            choice("Extra toasted"),
          ],
        },
        {
          name: "Sauce",
          options: [
            choice("House sauce"),
            choice("Garlic mayo"),
            choice("Smoky BBQ"),
            choice("Sauce on side"),
          ],
        },
      ],
      extras: [
        choice("Extra chicken", 3),
        choice("Cheddar", 1.5),
        choice("Avocado", 2),
        choice("Pickles", 0.5),
      ],
      removals: ["No onions", "No lettuce", "No tomato"],
    },
    Sides: {
      groups: [
        {
          name: "Seasoning",
          options: [
            choice("Classic"),
            choice("Light salt"),
            choice("Chili flakes"),
            choice("No added salt"),
          ],
        },
        {
          name: "Dip",
          options: [
            choice("House dip"),
            choice("Garlic mayo"),
            choice("Smoky BBQ"),
            choice("No dip"),
          ],
        },
      ],
      extras: [
        choice("Extra dip", 0.5),
        choice("Extra parmesan", 1.5),
        choice("Chili oil", 0.5),
      ],
      removals: ["No herbs", "No parmesan"],
    },
    Desserts: {
      groups: [
        {
          name: "Serving",
          options:
            p.id === "brownie"
              ? [choice("Room temperature"), choice("Warm")]
              : [choice("Chilled"), choice("Room temperature")],
        },
        {
          name: "Finish",
          options: [
            choice("Classic"),
            choice("Cocoa dusting"),
            choice("No dusting"),
          ],
        },
      ],
      extras: [
        choice("Chocolate drizzle", 1),
        choice("Vanilla ice cream", 2),
        choice("Whipped cream", 1),
        choice("Crushed biscuits", 0.5),
      ],
      removals: [],
    },
    Drinks: {
      groups: [
        {
          name: "Ice",
          options: [
            choice("Regular ice"),
            choice("Less ice"),
            choice("No ice"),
          ],
        },
        {
          name: p.id === "latte" ? "Milk" : "Sweetness",
          options:
            p.id === "latte"
              ? [
                  choice("Whole milk"),
                  choice("Oat milk", 1),
                  choice("Almond milk", 1),
                ]
              : [
                  choice("Classic"),
                  choice("Less sweet"),
                  choice("No added sugar"),
                ],
        },
      ],
      extras:
        p.id === "latte"
          ? [
              choice("Extra espresso", 1),
              choice("Vanilla syrup", 0.5),
              choice("Caramel syrup", 0.5),
            ]
          : [
              choice("Extra berries", 1),
              choice("Extra lime", 0.5),
              choice("Mint", 0.5),
            ],
      removals: p.id === "latte" ? ["Decaf"] : ["No mint"],
    },
  };
  if (p.id === "wings")
    return {
      groups: [
        {
          name: "Glaze",
          options: [
            choice("House glaze"),
            choice("Smoky BBQ"),
            choice("Hot chili"),
            choice("Glaze on side"),
          ],
        },
        {
          name: "Dip",
          options: [
            choice("Garlic yogurt"),
            choice("Ranch"),
            choice("Garlic mayo"),
            choice("No dip"),
          ],
        },
      ],
      extras: [
        choice("Extra wings (3 pieces)", 4),
        choice("Extra dip", 0.5),
        choice("Chili sauce", 0.5),
      ],
      removals: ["No sesame", "No garnish"],
    };
  return configs[p.category];
}
