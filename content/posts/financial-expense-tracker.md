---
date: 2024-04-16 00:00:00 +0800
title: "Financial Expense Tracker"
categories:
  - business-intelligence
pin: false
render_with_liquid: false
tags:
   - Data Visualization
   - Looker Studio
   - Fivetran
   - Big Query
   - Google Sheets
includes_code: yes
includes_math: yes
---

{{< notice info >}}
The app and the core code are available on [GitHub](https://github.com/ahmedsalim3/Expense-Tracker.git). To test the demo app and explore the dashboard, visit this [site](https://ahmedsalim3.github.io/Expense-Tracker/).
{{< /notice >}}

This project delves into the intricate connections between various platforms to enable users to effectively track their daily expenses and gain actionable insights into their financial health. It harnesses the capabilities of Fivetran, Google Sheets, BigQuery, and Looker Studio to provide users with a comprehensive solution for managing their finances with ease and precision.

## Introduction:

In today's fast-paced world, efficiently managing personal finances is essential for securing financial stability and peace of mind. With this goal in mind, I embarked on the development of an interactive Financial Expense Tracker (FET) web application. This application not only facilitates the effortless input of new expense and income data but also offers users a dynamic Business Intelligence (BI) dashboard integrated with Google Data Studio, also known as Looker. Continuously reflecting updated financial data entered by users, this dashboard enhances their financial oversight and decision-making capabilities.

## Financial Expense Tracker Web Application:

The FET app provides users with a convenient platform to monitor and manage their financial expenditures. Designed for simplicity and functionality, this application offers intuitive features to streamline expense tracking.

The main content area features a form for adding new data, along with options for selecting the Account, Category, and Transaction Type. When users submit new data through the form, the application initiates a POST request to a designated endpoint. This endpoint, a Google Sheets script deployed as a web app, handles incoming HTTP requests and processes the new data accordingly, dynamically storing the submitted data in the Google spreadsheet.

Google Sheets serves as the foundational data storage solution for our FET app. Its familiar interface and collaborative capabilities make it an ideal choice for managing financial data. Each user's expenses and income are recorded in a dedicated sheet within the Google Sheets document, ensuring data integrity and accessibility.

{{< financial-expense-tracker-app >}}

## Leveraging Fivetran for Connecting Sources & Destination:

Fivetran is a modern, cloud-based automated data movement platform designed to effortlessly extract, load, and transform data between a wide range of sources and destinations.

We set up a new Fivetran connection to select our data source. For this demo, we utilized the Google Sheets data source that the FET app uses. This Google Sheets connection serves as the primary repository for storing and managing users' financial data. By integrating Fivetran into our Financial Expense Tracker application, we ensure seamless synchronization between Google Sheets and our database, enabling real-time data updates and enhancing the user experience.

Next up, we choose Google BigQuery as the destination for our data. Google BigQuery acts as the backbone of our data processing infrastructure, enabling fast and scalable analysis of large datasets. By connecting our Google Sheets data to BigQuery, we unlock advanced analytics capabilities, including real-time reporting, predictive modeling, and machine learning. Additionally, Fivetran offers a feature allowing us to protect sensitive data through either hashing or blocking methods, so that we can protect SSN, CC, or PII info in our data.

Once our data has synced, we've transformed the data at this point. Fivetran has great built in tools to transform our connected data. At this point, we connected this data to a BI tool for analysis, Google Data Studio aka Looker Studio.

## Visualizing Insights with Looker Studio:

Looker Studio provides a powerful platform for visualizing and analyzing data from Google BigQuery. Our dynamic dashboard, created using Looker, offers users a comprehensive overview of their financial status and trends. From tracking available balance and total transactions to analyzing expense categories and income sources, the dashboard empowers users to make informed financial decisions with confidence.

{{< financial-expense-tracker-dashboard >}}

Users can visualize their expense data through [FET app][section-web-app], providing insights into their spending patterns and financial habits. By clicking the "Show Dashboard" link located in the footer of the application, users can toggle the visibility of this interactive visualization, enhancing their understanding of their financial situation.

## Conclusion:

In conclusion, our Financial Expense Tracker application leverages the synergies between Fivetran, Google Sheets, BigQuery, and Looker Studio to offer users a comprehensive solution for managing their finances effectively. By providing seamless data integration, robust storage, advanced analytics, and intuitive visualization, we empower users to take control of their financial health and achieve their goals with confidence. Whether tracking daily expenses, analyzing spending patterns, or monitoring financial trends, our application simplifies the process and enhances the overall financial management experience. With the power of technology at their fingertips, users can navigate the complexities of personal finance with ease and precision.


{{< notice note "Note" >}}
To test the FET app demo and explore its dashboard, visit this [site](https://ahmedsalim3.github.io/Expense-Tracker/). Submit new data and then click "View Dashboard" in the footer. The dashboard will be updated with the new data within 15 minutes. If you need a quicker update, open the report in Google Looker Studio and refresh the data.
{{< /notice >}}

{{< notice info >}}
Feel free to watch this 1-minute [YouTube](https://youtu.be/NTogK6VHEDc) video for a quick overview.
The app and the core code are also available on [GitHub](https://github.com/ahmedsalim3/Expense-Tracker.git).
{{< /notice >}}

{{< financial-expense-tracker-video >}}

[section-web-app]: #financial-expense-tracker-web-application
