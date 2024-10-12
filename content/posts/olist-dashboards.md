---
date: 2023-01-26 00:00:00 +0800
title: "OLIST E-Commerce Reporting Dashboard"
categories:
  - business-intelligence
pin: false
render_with_liquid: false
tags:
   - Data Visualization
   - PowerBI
   - DAX
   - Power Query
   - Data Analytics
includes_code: yes
includes_math: yes
---

{{< notice note "Important Note" >}}
The Power BI eXchange file and data used in this blog can be found in this [GitHub link](https://github.com/ahmedsalim3/public-data/tree/main/olist-dashboards)
{{< /notice >}}

## Overview

In our data-driven era, it's essential to harness data for smart decision-making, and crafting a user-friendly dashboard is key to that. If you're new to Power BI or looking to refine your skills, I recommend checking out my previous blog post, [Power BI Tutorial: Tips for Clear Data Visualizations][powerbi-tutorial]. In that post, I covered essential principles of designing effective Power BI dashboards, common issues to avoid, and practical tips to enhance your visualizations. It’s a great resource to get a comprehensive understanding of Power BI's capabilities and best practices.

Let's explore how to build a Power BI dashboard using OLIST e-commerce database. We collected the datasets from [Kaggle][data-source]

Before we get started, here is the final Dashboard's overview:

{{< olist-dashboards >}}

## Data Source: A Peek into the Dataset

OLIST is the largest department store in the Brazilian e-commerce marketplace. Their publicly available database contains retail datasets of 100k orders placed on Olist, spanning from October 2016 to September 2018 across several states. The data includes information on prices, orders, order statuses, payments, freight, and user reviews, among many other parameters. It consists of almost 100,000 customer IDs and order IDs. To summarize, the data covers order details, customer details, product details, seller details, payment details, geolocation details, and review details. The database schema model is shown below to help understand how the data interrelate with each other.

{{< figure src="/posts/olist-dashboards/img1.jpg" alt="Entitiy-relationship model diagram of Olist Dataset" caption="Entitiy-relationship model diagram of Olist Dataset" width="100%" class="right" >}}


[powerbi-tutorial]: ../powerbi-tutorial
[data-source]: https://www.kaggle.com/datasets/olistbr/brazilian-ecommerce