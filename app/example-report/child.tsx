"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
export function customLoader({ src, width, quality }: any) {
    return `https:${src}?w=${width}&q=${quality || 75}`;
}
export const Child = ({ assets }: any) => {
    const [loaded, setLoaded] = useState(false);
    const [sortedImages, setSortedImages] = useState([]);

    useEffect(() => {
        // Filter assets to get only images
        const images = assets.items.filter((asset: any) =>
            asset.fields.file.contentType.startsWith("image")
        );
        const imagesF = assets.items.filter((asset: any) => {
            // Check if the title is a number
            const title = asset.fields.title;
            return (
                !isNaN(title) &&
                asset.fields.file.contentType.startsWith("image")
            );
        });
        // Sort images by title
        imagesF.sort((a: any, b: any) => {
            const numA = parseInt(a.fields.title, 10);
            const numB = parseInt(b.fields.title, 10);

            if (numA < numB) {
                return -1;
            }
            if (numA > numB) {
                return 1;
            }
            return 0;
        });

        // Set loaded flag to true after sorting
        setLoaded(true);

        // Update sorted images state
        setSortedImages(imagesF);
    }, [assets]);
    return (
        <div>
            <div className="wrapper max-w-[1000px]">
                {loaded &&
                    sortedImages &&
                    sortedImages.map((image: any, i: number) => {
                        return (
                            <div>
                                {i === 0 ? (
                                    <Image
                                        alt="pdf page"
                                        width={
                                            image.fields.file.details.image
                                                .width
                                        }
                                        height={
                                            image.fields.file.details.image
                                                .height
                                        }
                                        priority={true}
                                        loader={customLoader}
                                        placeholder="blur"
                                        blurDataURL="/images/l.png"
                                        src={image.fields.file.url}
                                    />
                                ) : (
                                    <Image
                                        alt="pdf page"
                                        width={
                                            image.fields.file.details.image
                                                .width
                                        }
                                        loader={customLoader}
                                        height={
                                            image.fields.file.details.image
                                                .height
                                        }
                                        placeholder="blur"
                                        blurDataURL="/images/l.png"
                                        src={image.fields.file.url}
                                    />
                                )}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
