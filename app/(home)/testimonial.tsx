import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/swiper-bundle.css";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

export const Testimonial = ({ content }: any) => {
    const testimonials = content.testimonial;

    return (
        <>
            {testimonials && (
                <>
                    <div style={{ height: content.spacer2 }}></div>
                    <Swiper
                        navigation
                        autoplay={{ delay: 10000 }}
                        pagination={{ clickable: true }}
                        className="mySwiper mb-10"
                    >
                        {testimonials &&
                            testimonials.map((item: any, index: number) => (
                                <SwiperSlide key={index}>
                                    <div className="wrapper py-10">
                                        <div className="flex flex-col mb-10 items-center  font-sans">
                                            <div className="rich-text font-medium heading-1 mb-4 flex flex-wrap gap-1">
                                                "
                                                {documentToReactComponents(
                                                    item.fields.testimonial
                                                )}
                                                "
                                            </div>
                                            <img
                                                className="w-[75px]"
                                                src={
                                                    item.fields.image.fields
                                                        .file.url
                                                }
                                                alt={item.fields.name}
                                            />
                                            <div className="heading-2">
                                                {item.fields.name}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </>
            )}
        </>
    );
};
