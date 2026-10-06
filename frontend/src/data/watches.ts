export type WatchListing = {
    id: string;
    title: string;
    description: string;
    images: string[];
};

export type WatchSection = {
    id: string;
    heading: string;
    watches: WatchListing[];
};

function watchImage(folder: string, filename: string) {
    return `/assets/watches/${folder}/${filename}`;
}

export const watchSections: WatchSection[] = [
    {
        id: 'mens-watches',
        heading: 'Men’s – Pre Owned Luxury Watches',
        watches: [
            {
                id: 'breitling-super-avenger-ii',
                title: 'Breitling Super Avenger II',
                description:
                    'Breitling Super Avenger II | Original Factory Diamond Bezel | 1.23 Carat VS1 Diamonds Set on Bezel | In immaculate condition with 2 Original Breitling leather Crock Bands one Black and one Brown | All papers but without a box | White face with white sub-dials | A Self Winding Automatic Chronometer Movement | Case Thickness is about 18mm | Case Diameter about 48mm',
                images: [
                    watchImage(
                        'breitling-super-avenger-ii',
                        'Breitling-1884-Super-Avenger-II-Diamond-BezelChronograph-South-Bay-Gold-Torrance-9.jpg',
                    ),
                    watchImage(
                        'breitling-super-avenger-ii',
                        'Breitling-1884-Super-Avenger-II-Diamond-BezelChronograph-South-Bay-Gold-Torrance-5.jpg',
                    ),
                    watchImage(
                        'breitling-super-avenger-ii',
                        'Breitling-1884-Super-Avenger-II-Diamond-BezelChronograph-South-Bay-Gold-Torrance-8.jpg',
                    ),
                ],
            },
            {
                id: 'rolex-datejust-ii',
                title: 'Rolex DateJust II',
                description:
                    'Rolex DateJust II | Stainless Steel Band | 18 karat White Gold fluted bezel | Box and Papers | South Bay Watches One Year Limited Warranty',
                images: [
                    watchImage(
                        'rolex-datejust-ii',
                        'Rolex-Oyster-Perpetual-Date-Just-Mens-Blue-Numbers-South-Bay-Gold-3.jpg',
                    ),
                    watchImage(
                        'rolex-datejust-ii',
                        'Rolex-Oyster-Perpetual-Date-Just-Mens-Blue-Numbers-South-Bay-Gold.png',
                    ),
                    watchImage(
                        'rolex-datejust-ii',
                        'Rolex-Oyster-Perpetual-Mens-Date-Just-II-116334-South-Bay-Gold-Torrance.png',
                    ),
                ],
            },
            {
                id: 'vacheron-constantin-diamond',
                title: 'Vacheron Constantin',
                description:
                    'Vacheron Constantin | Very Rare and Unique | Square shape case made of 18k Yellow Gold and embellished with Diamonds | The band is not original but matches the style of the watch perfectly | Case: 36mm | Thickness 4mm | No box or papers | Mechanical wind up movement | One year limited warranty',
                images: [
                    watchImage(
                        'vacheron-constantin-diamond',
                        'Vacheron-Constantine-Watch-Diamond-South-Bay-Gold-Torrance-5.jpg',
                    ),
                    watchImage(
                        'vacheron-constantin-diamond',
                        'Vacheron-Constantine-Watch-Diamond-South-Bay-Gold-Torrance-2.jpg',
                    ),
                    watchImage(
                        'vacheron-constantin-diamond',
                        'Vacheron-Constantine-Watch-Diamond-South-Bay-Gold-Torrance.jpg',
                    ),
                ],
            },
            {
                id: 'montblanc-meisterstuck-4810',
                title: 'Montblanc Meisterstück 4810',
                description:
                    'Montblanc | Automatic Chronograph Meisterstück 4810 | Case is a Solid 18k Yellow Gold 38mm | Automatic | Valjoux 7751 | 25J Sapphire Crystal | Dial has a White face with 3 sub-dials Day/Date at 3 | The Strap is not the Original black strap But we do have the original just needs to be reconditioned | Water resistant 30m | This watch is Pre owned in excellent condition | Does not come with box or papers',
                images: [
                    watchImage(
                        'montblanc-meisterstuck-4810',
                        'Monte-Blanc-Chronograph-Meisterstuck-4810-18k-Gold-South-Bay-Gold-Torrance.jpg',
                    ),
                    watchImage(
                        'montblanc-meisterstuck-4810',
                        'Monte-Blanc-Chronograph-Meisterstuck-4810-18k-Gold-South-Bay-Gold-Torrance-2.jpg',
                    ),
                    watchImage(
                        'montblanc-meisterstuck-4810',
                        'Monte-Blanc-Chronograph-Meisterstuck-4810-18k-Gold-South-Bay-Gold-Torrance-1.jpg',
                    ),
                ],
            },
            {
                id: 'montblanc-timewalker',
                title: 'Montblanc TimeWalker',
                description:
                    'Montblanc TimeWalker | White face | chronograph | Scratch free Sapphire Crystal | Self Winding Automatic Movement | 43mm Face | Black leather Band with a Crock | Water Resistant 30 Meters or 100 Feet',
                images: [
                    watchImage(
                        'montblanc-timewalker',
                        'Mont-Blanc-Mens-Automatic-Watch-South-Bay-Gold-Finleys-Torrance.jpg',
                    ),
                ],
            },
            {
                id: 'jaeger-lecoultre-amvox5',
                title: 'Jaeger-LeCoultre AMVOX5 World Chronograph',
                description:
                    'Jaeger-LeCoultre AMVOX5 World Chronograph. Aston Martin inspired. Calibre 752 movement, with a column wheel, vertical clutch chronograph and lubricant-free ceramic ball-bearing mechanism. Limited edition of 200 pieces. Q193L471. Black ceramic with an 18 karat rose gold crown and black case and 18 karat gold buckle. Case size 44mm.',
                images: [
                    watchImage(
                        'jaeger-lecoultre-amvox5',
                        'Jaeger-Lecoutre-AMVOX5-World-Chronograph-Watch-South-Bay-Gold-Torrance.jpg',
                    ),
                ],
            },
            {
                id: 'cartier-roadster',
                title: 'Cartier Roadster',
                description:
                    'Cartier Roadster | Stainless steel case bezel and bracelet | Silver dial with silver-tone hands | Luminescent hands and markers, Date display | Automatic movement, Scratch resistant sapphire crystal | Case dimensions: 50.2 mm x 49.2 mm | Case thickness: 14.44 mm | Deployment clasp | Water resistant at 100 meters / 330 feet',
                images: [
                    watchImage(
                        'cartier-roadster',
                        'Cartier-Roadster-Chronograph-3-South-Bay-Gold-Torrance-W6206019.jpg',
                    ),
                    watchImage(
                        'cartier-roadster',
                        'Cartier-Roadster-Chronograph-5-South-Bay-Gold-Torrance-W6206019.jpg',
                    ),
                    watchImage(
                        'cartier-roadster',
                        'Cartier-Roadster-Chronograph-2-South-Bay-Gold-Torrance-W6206019.jpg',
                    ),
                ],
            },
            {
                id: 'piaget-9930',
                title: 'Piaget 9930',
                description:
                    'Piaget Watch 9930 | 18K White Gold | Case Measuring 29mm | White Face with Roman Numeral Numbers | Scratch Resistant Sapphire Crystal | Crown is 18K White Gold | Genuine Crocodile Leather Band with an 18k White Gold Pin and Buckle',
                images: [
                    watchImage('piaget-9930', 'Piaget-Watch-9930-White-Gold-South-Bay-Gold-Torrance.png'),
                ],
            },
            {
                id: 'rolex-milgauss-116400',
                title: 'Rolex Milgauss 116400',
                description:
                    'Rolex Milgauss 116400 | Stainless Steel Case With a Polished Stainless Steel Bezel | 31 Jewel chronometer Automatic movement | Green Scratch Resistant Sapphire Crystal | 40mm Case | Stainless Steel Oyster Band | Black Face | Anti-Magnetic Shield Magnetic Flux Density of 1000 Gauss | Certificate of Authenticity and Box | South Bay Watches One Year Limited Warranty',
                images: [
                    watchImage(
                        'rolex-milgauss-116400',
                        'Rolex-Mens-Oyster-Perpetual-Milgauss-Black-116400-South-Bay-Gold-Torrance-2.jpg',
                    ),
                    watchImage(
                        'rolex-milgauss-116400',
                        'Rolex-Mens-Oyster-Perpetual-Milgauss-Black-116400-South-Bay-Gold-Torrance-4.jpg',
                    ),
                    watchImage(
                        'rolex-milgauss-116400',
                        'Rolex-Mens-Oyster-Perpetual-Milgauss-Black-116400-South-Bay-Gold-Torrance-3.jpg',
                    ),
                ],
            },
            {
                id: 'rolex-oyster-perpetual-1005',
                title: 'Rolex Oyster Perpetual 1005',
                description:
                    'Rolex Oyster Perpetual | 1005 | 14k Yellow Gold | Automatic Movement | 34mm | Standard Dial Type With a Fluted Bezel | Excellent condition for its age | South Bay Watches One Year Limited Warranty',
                images: [
                    watchImage(
                        'rolex-oyster-perpetual-1005',
                        'Rolex-Oyster-Perpetual-14k-Gold-1005-South-Bay-Gold-Torrance-1.jpg',
                    ),
                    watchImage(
                        'rolex-oyster-perpetual-1005',
                        'Rolex-Oyster-Perpetual-14k-Gold-1005-South-Bay-Gold-Torrance-2.jpg',
                    ),
                    watchImage(
                        'rolex-oyster-perpetual-1005',
                        'Rolex-Oyster-Perpetual-14k-Gold-1005-South-Bay-Gold-Torrance-4.jpg',
                    ),
                ],
            },
        ],
    },
    {
        id: 'womens-watches',
        heading: 'Women’s – Pre Owned Luxury Watches',
        watches: [
            {
                id: 'rolex-datejust-16233',
                title: 'Rolex DateJust 16233',
                description:
                    'Rolex DateJust | 18kt Yellow Gold & Stainless Steel Bracelet | Ref# 16233 | Tapestry Champagne dial & 18kt Yellow Gold Bezel | Water resistant at 30 Meters or 100 Feet | No Box or Papers | Scratch Resistant Sapphire Crystal | Waterproof Screw Down Crown | South Bay Watches One Year Limited Warranty',
                images: [
                    watchImage(
                        'rolex-datejust-16233',
                        'Rolex-Ladies-DateJust-2Tone-Tapestry-South-Bay-Gold-16233.jpg',
                    ),
                    watchImage(
                        'rolex-datejust-16233',
                        'Rolex-Ladies-DateJust-2Tone-Tapestry-South-Bay-Gold-16233-3.jpg',
                    ),
                    watchImage(
                        'rolex-datejust-16233',
                        'Rolex-Ladies-DateJust-2Tone-Tapestry-South-Bay-Gold-16233-2.png',
                    ),
                ],
            },
            {
                id: 'raymond-weil-5593',
                title: 'Raymond Weil 5593 Toccata',
                description:
                    'Raymond Weil 5593 Toccata Stainless Steel Two Tone Watch | Quartz battery | Watch band and case are stainless steel and gold plated stainless steel | Scratch resistant sapphire crystal, water resistant to 100m | Case is 34.5 mm in diameter and 6 mm thick | Comes with extra links | South Bay Watches One Year Limited Warranty',
                images: [
                    watchImage(
                        'raymond-weil-5593',
                        'Raymond-Weil-2-Tone-5593-Toccata-Watch-South-Bay-Gold.jpg',
                    ),
                ],
            },
            {
                id: 'omega-constellation',
                title: 'Omega Constellation',
                description:
                    'Omega Constellation | Quartz Movement With Battery | The Dial is a Dark Grey almost Black (Diamond Textured) | Luminescent Hands | Scratch Resistant Sapphire Crystal | Case is all Stainless Steel | Case Diameter of 24mm | Bracelet is Stainless Steel Measuring 6.5″ | South Bay Watches One Year Limited Warranty',
                images: [
                    watchImage(
                        'omega-constellation',
                        'Omega-Womens-Constellation-Dark-Grey-Diamond-Watch-South-Bay-Gold.jpg',
                    ),
                ],
            },
            {
                id: 'cartier-santos-1120',
                title: 'Cartier Santos 1120',
                description:
                    'Cartier Santos Ladies Watch | Reference number 1120, C118735 | 18k Yellow Gold Upper Bezel | Blue Sapphire Crown | Black Leather Band | Cartier Quartz Battery Movement | No Box or Papers | South Bay Watches One Year Limited Warranty',
                images: [
                    watchImage('cartier-santos-1120', 'Cartier-De-Santos-1120-Women-Watch-South-Bay-Gold.jpg'),
                ],
            },
            {
                id: 'cartier-santos-0959',
                title: 'Cartier Santos Galbée 0959',
                description:
                    'Cartier Santos Galbée Collection – 0959 | Band Material 18K Solid Yellow Gold | Band Size Fits up to 6.5″ wrist | Case Material 18K Solid Yellow Gold | Dial Color White | Case Size 24mm | Box Included But no Papers | Movement Automatic | South Bay Watches One Year Limited Warranty',
                images: [
                    watchImage(
                        'cartier-santos-0959',
                        'Cartier-Santos-0959-18kGold-Womens-Watch-South-Bay-Gold.jpg',
                    ),
                ],
            },
            {
                id: 'cartier-colisee',
                title: 'Cartier Colisée',
                description:
                    'Cartier Colisée | 18k Gold with Diamonds on the Bezel | Case Size is about 23.5mm | TWC 0.75ct Diamond | Scratch Resistant Sapphire Crystal | 6.5″ Band | Movement is a Cartier Quartz Battery | No Box Or Papers, Vintage Watch | South Bay Watches One Year Limited Warranty',
                images: [
                    watchImage(
                        'cartier-colisee',
                        'Cartier-Womens-Yellow-Gold-Diamond-Watch-Colisee-Sout-Bay-Gold.jpg',
                    ),
                ],
            },
            {
                id: 'rolex-datejust-179174',
                title: 'Rolex DateJust 179174',
                description:
                    'Rolex Oyster Perpetual DateJust 179174 | White Face with an all Stainless Steel Case | The Bezel is Fluted 18K White Gold | The Bracelet is Stainless Steel 12 mm Wide | Bracelet Length: Approximately 5.75″ | Sapphire Crystal | Case Diameter is 26 mm | Water Resistance | Automatic Movement | Box and Papers | South Bay Watches One Year Limited Warranty',
                images: [
                    watchImage(
                        'rolex-datejust-179174',
                        'Rolex-Watch-Ladies-Stainless-Steel-White-Face-Oyster-Perpetual-DsteJust-South-Bay-Gold-179174.jpg',
                    ),
                ],
            },
        ],
    },
];
