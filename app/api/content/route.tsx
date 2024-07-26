// contentful.js
// import { gql, GraphQLClient } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export async function GET(request: NextRequest) {
    // const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`;
    // const graphQLClient = new GraphQLClient(endpoint, {
    //     headers: {
    //         Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
    //     },
    // });

    // const query = gql`
    //     query GetHomePage {
    //         homePageCollection(limit: 1) {
    //             items {
    //                 heroTitle
    //                 heroContent {
    //                     json
    //                 }
    //             }
    //         }
    //     }
    // `;

    // try {
    //     const response: any = await graphQLClient.request(query);

    //     const homePage = response.homePageCollection.items[0];
    //     const heroContentHtml = documentToHtmlString(homePage.heroContent.json);

    //     return new NextResponse(
    //         JSON.stringify({
    //             message: "Successfully retrieved data",
    //             data: {
    //                 heroTitle: homePage.heroTitle,
    //                 heroContent: heroContentHtml,
    //             },
    //         }),
    //         {
    //             status: 200,
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         }
    //     );
    // } catch (error) {
    //     console.error("Error fetching homePage content:", error);
    //     throw new Error("Failed to fetch homePage content");
    // }
    return new NextResponse(
        JSON.stringify({
            message: "Successfully retrieved data",
            data: null,
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}
