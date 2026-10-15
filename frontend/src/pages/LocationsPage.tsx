import { Card, CardContent } from '@/components/ui/card';
<<<<<<< HEAD
import { TORRANCE_PHONE } from '@/lib/contact';
=======
import { publicAsset } from '@/lib/publicAsset';
>>>>>>> square_space
import { MapPin, Phone, ClockIcon } from 'lucide-react';

export function LocationsPage() {
    const locations = [
        {
            name: 'Torrance',
            image: '/assets/StoreFront-SBG-Torrance.png',
            address: '21721 Hawthorne Blvd, Torrance, CA 90503',
            phone: TORRANCE_PHONE,
            hours: 'Mon - Sat: 10:00 AM - 6:00 PM',
            mapsUrl: 'https://www.google.com/maps/place/South+Bay+Gold/@33.824662,-118.3540529,17z/data=!3m1!4b1!4m6!3m5!1s0x80dd4b260ea3f585:0x64a70e112183f1bd!8m2!3d33.824662!4d-118.351478!16s%2Fg%2F1tmg6w5v?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D',
        },
        {
            name: 'Manhattan Beach',
            image: '/assets/StoreFront-SBG-Manhattan.png',
            address: '1141 Manhattan Ave, Manhattan Beach, CA 90266',
            phone: '+13107961800',
            hours: 'CLOSED FOR RENOVATIONS',
            mapsUrl: 'https://www.google.com/maps/place/South+Bay+Gold+%2B+Finley\'s+Jewelers+-+Gold+%26+Diamond+Buyer,+North+Sepulveda+Boulevard,+Manhattan+Beach,+CA,+USA/@33.824662,-118.3566278,16z/data=!4m5!3m4!1s0x80c2b3f706c40f43:0x89d4d0dd095272ec!8m2!3d33.8943963!4d-118.3962729?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D',
        },
        {
            name: 'Redondo Beach',
            image: '/assets/FinleysJewelersRedondoBeach.png',
            address: '1828 S Catalina Ave, Redondo Beach, CA 90277',
            phone: '+13107913052',
            hours: 'Tue - Fri: 10:00 AM - 5:30 PM, Sat: 11:00 AM - 5:00 PM',
            mapsUrl: 'https://www.google.com/maps/place/Finley\'s+Jewelers+Since1924/@33.8182783,-118.3883147,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICkx5Pi8QE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAFz-2fXGS2mkMTTVTGT2QMaCoezhKLk6zaJM1vifSfw1buBONWFgy64AgPwdN2xvNDVfsfUnEsM-cWYB_zsthczWRdbQGV3TNRPAK_roncGDeHKvXsjdz5u1UtLb5zHr18BgHX2rQ%3Dw147-h86-k-no!7i3252!8i1898!4m7!3m6!1s0x80dd4b573d746e0f:0xc2706595178c1a4b!8m2!3d33.8182737!4d-118.388338!10e5!16s%2Fg%2F1w97vpv_?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D',
        },
    ];

    return (
        <main className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Our Locations
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Visit any of our three convenient locations in the South Bay area
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {locations.map((location, index) => (
                        <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow border-gold/20">
                            <div className="aspect-[4/3] bg-muted/30 overflow-hidden">
                                <img
                                    src={publicAsset(location.image)}
                                    alt={`${location.name} storefront`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <CardContent className="p-6">
                                <h2 className="text-2xl font-bold text-foreground mb-4">
                                    {location.name}
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                                        <a
                                            href={location.mapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-gold transition-colors"
                                        >
                                            <p>
                                                {location.address}
                                            </p>
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 text-gold flex-shrink-0" />
                                        <a
                                            href={`tel:${location.phone}`}
                                            className="text-foreground font-medium hover:text-gold transition-colors"
                                        >
                                            {location.phone}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <ClockIcon className="h-5 w-5 text-gold flex-shrink-0" />
                                        <p>{location.hours}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
}
