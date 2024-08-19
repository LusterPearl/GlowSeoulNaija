const products = [
    // Skincare
    { name: 'Gentle Foaming Cleanser', description: 'A soft foam cleanser.', price: 20000, quantity: 100, category: 'Skincare - Cleansers' },
    { name: 'Oil Cleanser', description: 'An oil-based cleanser for deep cleansing.', price: 250000, quantity: 80, category: 'Skincare - Cleansers' },
    { name: 'Hydrating Toner', description: 'A toner that hydrates.', price: 150000, quantity: 150, category: 'Skincare - Toners' },
    { name: 'Exfoliating Toner', description: 'A toner with exfoliating properties.', price: 180000, quantity: 120, category: 'Skincare - Toners' },
    { name: 'Hydrating Essence', description: 'A lightweight essence for hydration.', price: 220000, quantity: 90, category: 'Skincare - Essences' },
    { name: 'Brightening Essence', description: 'An essence that brightens the skin.', price: 2400000, quantity: 75, category: 'Skincare - Essences' },
    { name: 'Vitamin C Serum', description: 'Brightening serum.', price: 300000, quantity: 80, category: 'Skincare - Serums' },
    { name: 'Hyaluronic Acid Serum', description: 'Hydrating serum for plump skin.', price: 320000, quantity: 60, category: 'Skincare - Serums' },
    { name: 'Gel Cream Moisturizer', description: 'Lightweight gel moisturizer.', price: 280000, quantity: 110, category: 'Skincare - Moisturizers' },
    { name: 'Water-Based Cream', description: 'Moisturizer that absorbs quickly.', price: 260000, quantity: 100, category: 'Skincare - Moisturizers' },
    { name: 'Sleeping Mask', description: 'Overnight hydrating mask.', price: 3500000, quantity: 70, category: 'Skincare - Moisturizers' },
    { name: 'SPF 50+ Sunscreen', description: 'High protection sunscreen.', price: 200050, quantity: 130, category: 'Skincare - Sunscreens' },
    { name: 'Lightweight Sunscreen', description: 'Lightweight formula sunscreen.', price: 1800000, quantity: 160, category: 'Skincare - Sunscreens' },
    { name: 'Hydrating Sheet Mask', description: 'Sheet mask for hydration.', price: 300099, quantity: 200, category: 'Skincare - Sheet Masks' },
    { name: 'Brightening Sheet Mask', description: 'Sheet mask to brighten the complexion.', price: 4000049, quantity: 180, category: 'Skincare - Sheet Masks' },

    // Makeup
    { name: 'Lightweight BB Cream', description: 'Lightweight coverage cream.', price: 1500009, quantity: 150, category: 'Makeup - BB Creams/CC Creams' },
    { name: 'CC Cream', description: 'Color correcting cream for a flawless look.', price: 1700099, quantity: 100, category: 'Makeup - BB Creams/CC Creams' },
    { name: 'Dewy Finish Cushion Foundation', description: 'Cushion compact for a dewy finish.', price: 3000099, quantity: 80, category: 'Makeup - Cushion Foundations' },
    { name: 'Long-lasting Lip Tint', description: 'Tinted lip color that lasts.', price: 1200099, quantity: 200, category: 'Makeup - Lip Tints' },
    { name: 'Gradient Lip Tint', description: 'Lip tint for a gradient effect.', price: 1400099, quantity: 150, category: 'Makeup - Lip Tints' },
    { name: 'Shimmery Eyeshadow', description: 'Eyeshadow with a shimmer finish.', price: 190009, quantity: 120, category: 'Makeup - Eyeshadows' },
    { name: 'Neutral Palette Eyeshadow', description: 'Palette with neutral tones.', price: 2400099, quantity: 90, category: 'Makeup - Eyeshadows' },
    { name: 'Lengthening Mascara', description: 'Mascara that lengthens lashes.', price: 1600050, quantity: 180, category: 'Makeup - Mascaras' },
    { name: 'Volumizing Mascara', description: 'Mascara that adds volume to lashes.', price: 180000, quantity: 170, category: 'Makeup - Mascaras' },
    { name: 'Cream Blush', description: 'Cream blush for a natural flush.', price: 1300099, quantity: 160, category: 'Makeup - Blushes' },
    { name: 'Powder Blush', description: 'Powder blush for easy application.', price: 1100050, quantity: 150, category: 'Makeup - Blushes' },
    { name: 'Eyebrow Pencil', description: 'Pencil for defining brows.', price: 9000099, quantity: 200, category: 'Makeup - Eyebrow Products' },
    { name: 'Eyebrow Gel', description: 'Gel for setting brows in place.', price: 120000, quantity: 180, category: 'Makeup - Eyebrow Products' },

    // Haircare
    { name: 'Nourishing Shampoo', description: 'Shampoo that nourishes hair.', price: 1400099, quantity: 150, category: 'Haircare - Shampoos' },
    { name: 'Volumizing Shampoo', description: 'Shampoo that adds volume.', price: 160009, quantity: 130, category: 'Haircare - Shampoos' },
    { name: 'Moisturizing Conditioner', description: 'Conditioner for hydration.', price: 1500049, quantity: 160, category: 'Haircare - Conditioners' },
    { name: 'Repair Conditioner', description: 'Conditioner that repairs damage.', price: 1700099, quantity: 140, category: 'Haircare - Conditioners' },
    { name: 'Deep Conditioning Mask', description: 'Mask for deep conditioning.', price: 2200099, quantity: 110, category: 'Haircare - Hair Masks' },
    { name: 'Repair Hair Mask', description: 'Mask that repairs damaged hair.', price: 2400099, quantity: 100, category: 'Haircare - Hair Masks' },
    { name: 'Anti-Frizz Serum', description: 'Serum that controls frizz.', price: 190009, quantity: 130, category: 'Haircare - Serums' },
    { name: 'Shine Serum', description: 'Serum that adds shine.', price: 2100000, quantity: 120, category: 'Haircare - Serums' },

    // Bodycare
    { name: 'Hydrating Body Lotion', description: 'Lotion for hydration.', price: 1800050, quantity: 140, category: 'Bodycare - Body Lotions' },
    { name: 'Firming Body Lotion', description: 'Lotion that firms skin.', price: 2000000, quantity: 130, category: 'Bodycare - Body Lotions' },
    { name: 'Exfoliating Body Scrub', description: 'Scrub that exfoliates skin.', price: 160000, quantity: 150, category: 'Bodycare - Body Scrubs' },
    { name: 'Brightening Scrub', description: 'Scrub that brightens skin.', price: 1700050, quantity: 140, category: 'Bodycare - Body Scrubs' },
    { name: 'Moisturizing Body Wash', description: 'Body wash for hydration.', price: 1200099, quantity: 160, category: 'Bodycare - Body Washes' },
    { name: 'Gentle Body Wash', description: 'Gentle cleanser for the body.', price: 100000, quantity: 170, category: 'Bodycare - Body Washes' },

    // Beauty Tools
    { name: 'Jade Roller', description: 'Facial roller made of jade.', price: 250099, quantity: 80, category: 'Beauty Tools - Facial Rollers' },
    { name: 'Rose Quartz Roller', description: 'Facial roller made of rose quartz.', price: 270099, quantity: 70, category: 'Beauty Tools - Facial Rollers' },
    { name: 'Electric Cleansing Brush', description: 'Cleansing brush for deep cleaning.', price: 350000, quantity: 60, category: 'Beauty Tools - Cleansing Brushes' },
    { name: 'Manual Cleansing Brush', description: 'Manual brush for facial cleansing.', price: 320000, quantity: 80, category: 'Beauty Tools - Cleansing Brushes' },
    { name: 'Sheet Mask Applicator', description: 'Applicator for sheet masks.', price: 100099, quantity: 200, category: 'Beauty Tools - Mask Applicators' },
    { name: 'Brush Set', description: 'Set of makeup brushes.', price: 2200000, quantity: 90, category: 'Beauty Tools - Brushes' }
  ];
  