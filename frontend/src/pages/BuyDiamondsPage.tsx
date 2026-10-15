import { DiamondsHero } from '@/components/DiamondsHero';
import { publicAsset } from '@/lib/publicAsset';

const cutShapes = [
    {
        src: '/assets/buydiamonds/Diamond-Round-Brilliant-South-Bay-Gold.png',
        alt: 'Diamond Round Brilliant - South Bay Gold',
        caption: 'Round Cut Brilliant Diamond',
    },
    {
        src: '/assets/buydiamonds/Diamond-Oval-Cut-South-Bay-Gold.png',
        alt: 'Diamond Oval-Cut - South Bay Gold',
        caption: 'Oval-Cut Diamond',
    },
    {
        src: '/assets/buydiamonds/Diamond-Cushion-Cut-South-Bay-Gold.png',
        alt: 'Diamond Cushion-Cut - South Bay Gold',
        caption: 'Cushion-Cut Diamond',
    },
    {
        src: '/assets/buydiamonds/Diamond-Heart-Cut-Shape-Southbay-gold.png',
        alt: 'Diamond Heart Cut or Shape - Southbay gold',
        caption: 'Heart Cut Diamond',
    },
    {
        src: '/assets/buydiamonds/Diamond-Pear-Shape-Tear-Drop-Cut-South-Bay-Gold.png',
        alt: 'Diamond Pear-Shape or Tear Drop Cut - South Bay Gold',
        caption: 'Pear-Shape or Tear Drop Diamond',
    },
    {
        src: '/assets/buydiamonds/Diamond-Marquise-Cut-South-Bay-Gold.png',
        alt: 'Diamond Marquise-Cut - South Bay Gold',
        caption: 'Marquise-Cut Diamond',
    },
    {
        src: '/assets/buydiamonds/Diamond-Trilliant-Cut-South-Bay-Gold.png',
        alt: 'Diamond Trilliant Cut - South Bay Gold',
        caption: 'Trilliant Cut Diamond aka Trillion or Trillian',
    },
    {
        src: '/assets/buydiamonds/Diamond-Triangle-Cut-South-Bay-Gold.png',
        alt: 'Diamond Triangle Cut - South Bay Gold',
        caption: 'Triangle Cut Diamond',
    },
    {
        src: '/assets/buydiamonds/Diamond-Princess-Cut-South-Bay-Gold.png',
        alt: 'Diamond Princess-Cut - South Bay Gold',
        caption: 'Princess-Cut Diamond',
    },
    {
        src: '/assets/buydiamonds/Diamond-Asscher-Cut-South-Bay-Gold.png',
        alt: 'Diamond Asscher-Cut - South Bay Gold',
        caption: 'Asscher-Cut Diamond',
    },
    {
        src: '/assets/buydiamonds/Diamond-Emerald-Cut-South-Bay-Gold.png',
        alt: 'Diamond Emerald-Cut - South Bay Gold',
        caption: 'Emerald-Cut Diamond',
    },
    {
        src: '/assets/buydiamonds/Diamond-Radiant-Cut-South-Bay-Gold.png',
        alt: 'Diamond Radiant-Cut - South Bay Gold',
        caption: 'Radiant-Cut Diamond',
    },
] as const;

const colorGrades = [
    ['1', 'D', 'Colorless'],
    ['2', 'E', 'Colorless'],
    ['3', 'F', 'Colorless'],
    ['4', 'G', 'Near Colorless'],
    ['5', 'H', 'Near Colorless'],
    ['6', 'I', 'Near Colorless'],
    ['7', 'J', 'Near Colorless'],
    ['8', 'K', 'Faint Yellow'],
    ['9', 'L', 'Faint Yellow'],
    ['10', 'M', 'Faint Yellow'],
    ['11', 'N, O, P, Q, R', 'Very Light Yellow'],
    ['12', 'S, T, U, V, W, X, Y, Z', 'Light Yellow'],
] as const;

const clarityGrades = [
    ['1', 'FL', 'Flawless'],
    ['2', 'IF', 'Internally Flawless'],
    ['3', 'VVS1', 'Very Very Slightly Included'],
    ['4', 'VVS2', 'Very Very Slightly Included'],
    ['5', 'VS1', 'Very Slightly Included'],
    ['6', 'VS2', 'Very Slightly Included'],
    ['7', 'SI1', 'Slightly Included'],
    ['8', 'SI2', 'Slightly Included'],
    ['9', 'I1', 'Included'],
    ['10', 'I2', 'Included'],
    ['11', 'I3', 'Included'],
] as const;

const sectionHeading = 'text-2xl font-bold text-primary md:text-3xl';

function GradeTable({
    caption,
    columns,
    rows,
}: {
    caption: string;
    columns: readonly [string, string, string];
    rows: readonly (readonly [string, string, string])[];
}) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border bg-card text-left text-sm text-primary">
                <caption className="mb-3 text-left text-lg font-bold text-primary">{caption}</caption>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column} scope="col" className="border border-border px-3 py-2 font-bold">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row[0]}>
                            {row.map((cell, index) => (
                                <td key={`${row[0]}-${index}`} className="border border-border px-3 py-2">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function BuyDiamondsPage() {
    return (
        <main className="bg-background">
            <DiamondsHero title="Buy Diamonds" />
            <div className="mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
                <img
                    src={publicAsset('/assets/buydiamonds/Buy-Diamond-Jewelry-Store-Los-Angeles-1.jpg')}
                    alt="Buy Diamond Jewelry Store Los Angeles"
                    className="h-auto w-full"
                />
                <div className="mx-auto w-full max-w-3xl space-y-4 py-10 text-left text-primary leading-relaxed">
                    <p>
                        South Bay Gold buys, sells, and trades Diamonds along with all other precious stones. Please
                        come to any of our stores and meet with our Certified Gemologists. We have several courteous,
                        GIA (Gemological Institute of America) certified gemologists on site to assist you upon
                        arrival. While appointments are not necessary, it is preferred since it may require a decent
                        amount of time to find and select the diamond of your choice.
                    </p>
                    <p>So you are getting married & you want to know how to choose the best diamonds?</p>
                    <p>
                        This is a diamond buying beginners course. You will learn the basics of diamond buying by
                        learning how to select a diamond within your budget. Please feel free to ask as many questions
                        when you are in our stores buying diamonds. We will start with the 4C’s of diamonds.
                    </p>
                    <h2 className={sectionHeading}>The 4 C’s of Diamonds</h2>
                    <h3 className="text-xl font-bold text-primary">What are the 4 C’s?</h3>
                    <p>
                        When jewelers or diamond traders refer to the 4 C’s of diamonds they are referring to 4 main
                        characteristics that help identify, classify, categorize, and arrive to a fair whole sale or
                        retail value of diamonds(loose or mounted). The 4 categories are what drives the diamond
                        market. Buying and selling diamonds is all about the 4 C’s. These guidelines help consumers
                        & diamond dealers(SBG is Diamond Dealer) choose between different qualities. The 4 C’s are
                        meant to show people the differences in diamonds, not just by looks, but also by the
                        characteristics that is within the stone. The 4 C’s help one understand a diamond’s
                        imperfections. An inclusion really does make a difference! The 4 C’s show the difference
                        between a pure white diamond and a diamond that has a yellow or brown cast to it. They show the
                        differences between sizes and weights and points and carats. They show the differences between
                        a good cut and a bad cut, a deep stone and a narrow stone (fisheye). The fascinating thing
                        about the 4 C’s of diamonds is that they will teach you how two diamonds of the exact same size
                        can be priced by the difference of thousands of dollars. The 4 C’s can be simple like
                        determining color with the naked eye or they can be very technical, like dealing with table
                        percentages, girdle thickness and symmetry. Above all else, the 4C’s are here to help you
                        understand the basic concepts of diamonds and diamond grading. They are in fact, the official
                        word. The 4 C’s are: Cut, Color, Clarity and Carat Weight
                    </p>
                </div>
                <img
                    src={publicAsset('/assets/buydiamonds/how-to-buy-diamonds-4Cs-Cut-Carat-Clarity-color-South-Bay-Gold.png')}
                    alt="How-To-Buy-Diamonds-4Cs-Cut-Carat-Clarity-color-South-Bay-Gold"
                    className="mx-auto h-auto w-full max-w-2xl"
                />
                <div className="mx-auto w-full max-w-3xl space-y-4 py-10 text-left text-primary leading-relaxed">
                    <h2 className={sectionHeading}>CUT</h2>
                    <p>
                        The quality of the cut determines the performance of light that reflects through the stone,
                        which affects the overall brilliance. The quality or type of cut affects the brightness of the
                        surface and interior of the diamond, the fire that emits from a diamond, and the brilliance as
                        the diamond moves when observed. The cut scale ranges from Excellent to Poor, where excellent
                        would be a diamond of fine proportion, symmetry, and polish which would have an optimal light
                        performance.
                    </p>
                </div>
                <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {cutShapes.map((shape) => (
                        <li key={shape.src}>
                            <figure className="text-center text-primary">
                                <img src={publicAsset(shape.src)} alt={shape.alt} className="mx-auto h-auto w-full" />
                                <figcaption className="mt-2 text-sm leading-relaxed">{shape.caption}</figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
                <div className="mx-auto w-full max-w-3xl space-y-4 py-10 text-left text-primary leading-relaxed">
                    <h2 className={sectionHeading}>COLOR</h2>
                    <p>
                        For diamonds in particular, the color grade ranges from D to Z where D stands for colorless and
                        Z stands for light yellow or brown. The value increases with the lesser amount of color. This
                        scale is for basic diamonds and does not account for colored diamonds.
                    </p>
                    <h2 className={sectionHeading}>CARAT</h2>
                    <p>
                        The weight of a diamond is determined by a unit of mass called carat. The larger the carat, the
                        more value a diamond is worth. One carat is equal to 200 milligrams(0.007055 oz). CT is the
                        common abbreviation used by the jewelry industry.
                    </p>
                    <h2 className={sectionHeading}>CLARITY</h2>
                    <p>
                        Clarity is the degree to which a diamond is free of blemishes and inclusions. Blemishes are
                        external scratches, small nicks, and/or parts of the rough crystals left of the finished stone
                        called naturals. Inclusions are internal other mineral crystals or diamonds, feathers(fractures),
                        traces of distortion in the structure, or drill holes made with a laser to lighten or remove
                        other inclusions.
                    </p>
                    <GradeTable
                        caption="GIA Diamond Grading"
                        columns={['#', 'Grade', 'Color']}
                        rows={colorGrades}
                    />
                    <GradeTable
                        caption="Diamonds Eleven Clarity Grades"
                        columns={['#', 'Grade', 'Category']}
                        rows={clarityGrades}
                    />
                </div>
            </div>
        </main>
    );
}
