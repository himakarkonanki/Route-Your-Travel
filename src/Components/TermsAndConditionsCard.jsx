import React from "react";

export default function TermsAndConditionsCard() {
  return (
    <div
      style={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        width: "100%",
        maxWidth: "794px",
        minHeight: "1123px",
        backgroundColor: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ backgroundColor: "#0f172a", minHeight: "80px" }} />

      {/* Content */}
      <div
        style={{
          padding: "2rem 1.5rem",
          fontSize: "15px",
          color: "#374151",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* Terms & Exclusions */}
        <div>
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "19px",
              marginBottom: "0.5rem",
              color: "#1f2937",
            }}
          >
            Terms & Exclusions
          </h2>
          <ul style={{ listStyleType: "disc", paddingLeft: "2.25rem", lineHeight: "1.75rem" }}>
            <li>Airfare Not Included</li>
            <li>Rooms & Rates Subject To Availability At The Time Of Confirmations</li>
            <li>Above Given Rate Valid For 02 Days Only</li>
            <li>Per Person 01 Checkin Baggage + 01 Hang Baggage</li>
            <li>
              Please Note The Vehicle Is Only Tour To Tour Basis And Additional Are Chargeable &
              Need To Be Settled Directly.
            </li>
          </ul>
        </div>

        {/* General Regulations */}
        <div>
          <h2
            style={{
              fontWeight: "bold",
              fontSize: "19px",
              marginBottom: "0.5rem",
              color: "#1f2937",
            }}
          >
            General Regulations
          </h2>
          <ul style={{ listStyleType: "disc", paddingLeft: "2.25rem", lineHeight: "1.75rem" }}>
            <li>
              Individuals With Medical Condition, Chronic Diseases And Respiratory Illnesses
              Shall Be Refrained From Engaging In These Activities.
            </li>
            <li>
              Any Activity Involving Serving Food And Beverage, Should Follow The Restrictions
              And Guidelines Set Earlier For All F&B Outlets. Any F&B Item Should Be Served In
              Single-Use, Disposable Containers, Cups And Utensils.
            </li>
            <li>
              All Activities Should Abide By The Capacity, Social Distancing, Group Count, And
              Restrictions As Expressed For Each Of The Following
            </li>
            <li>
              Wearing Masks Is Mandatory For All Guests At All Time, Unless They Are Engaged In
              A Very Vigorous Or High Intensity Activity Then They Can Lower It.
            </li>
            <li>
              All Activities Should Follow Strict Hygiene And Sanitization Measures As Mentioned
              For Each Activity
            </li>
            <li>
              Elevators And Escalators Shall Operate With Social Distancing Measures Through
              Markings On The Floor
            </li>
            <li>
              All Individuals Or Guests Should Undergo Temperature Screening Process Through
              Contactless Thermometer
            </li>
          </ul>
        </div>

        {/* Footer Note */}
        <div
          style={{
            paddingTop: "50px",
            textAlign: "center",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#9ca3af",
          }}
        >
          Every detail crafted, so you can travel carefree.
          <br />
          Let the journey begin.
        </div>
      </div>
    </div>
  );
}
