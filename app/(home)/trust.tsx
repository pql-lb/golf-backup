import { useEffect } from "react";

const TrustpilotWidget = () => {
    useEffect(() => {
        // Ensure the TrustBox script is loaded
        const script = document.createElement("script");
        script.src =
            "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <div
                className="trustpilot-widget"
                data-locale="en-US"
                data-template-id="YOUR_TEMPLATE_ID"
                data-businessunit-id="YOUR_BUSINESS_UNIT_ID"
                data-style-height="24px"
                data-style-width="100%"
                data-theme="light"
                data-min-review-count="10"
            >
                <a
                    href="https://www.trustpilot.com/review/YOUR_WEBSITE.com"
                    target="_blank"
                    rel="noopener"
                >
                    Trustpilot
                </a>
            </div>
        </div>
    );
};

export default TrustpilotWidget;
