import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Link from "next/link";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export const PdfViewer = ({ pdfBlob }: any) => {
    return (
        <div className="relative   w-fit ">
            <Document file={pdfBlob}>
                {Array.from(new Array(20), (el, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        renderMode="canvas"
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        pageNumber={index + 1}
                    />
                ))}
            </Document>
        </div>
    );
};
