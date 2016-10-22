# Loans granted and amount average during crisis in USA
## Summary

The financial crisis of 2007–09, also known as the global financial crisis and the 2008-09 financial crisis, is considered by many economists to have been the worst financial crisis since the Great Depression of the 1930s. Loans granted and its amount reflects how deep this crisis was. Given the loan data from Prosper we could see how the crisis evolved. In particular we'll see how some categorized loans (in this case Business, Vacation and Medical) evolved in number of loans and amount money requested from 2006 to 2013.

## Design

Firts of all is to become familiarized with the data doing some exploratory data analysis. With enough knowledge i can extract some ideas and scratch them.

My first try was to show how many loans was granted each year. For that purpose I thought in a simple bar chart, removing first and last year (2005 and 2014) because it doesn't have complete info about the year. The main idea was setted and it worked but i wanted to show more info and I added two more factors to the graph: the listing category and the amount average of the loan.

Too many listing categories could be shown so I just selected what I thought there were more significative: Business, Medical/Dental and Vacation. This graph (tagged as version 1) shows two data series, one with the bar chart of the number of loans granted by year and listing category and another one with the lines representing the evolution of the amount average of each year/category.

Asking for feedback I realized that my main concept was clear but some things must be updated to show what I actually want. I changed the bars and lines and create a new bubble plot with the same concepts. The main difference is that disappears the two mixed plots and adds just one. This is a suggestion learned in the course when you want two show more than two variables in the same graph.

Finally a new version (version 3) was created adding more interaction to the plot and improved labels text.

## Feedback

Asking people for feedback helps me to realize that my main concept was in the right direction but some improves must be done. The plot shared for this purpose was the first version (version 1).

### Feedback 1

What do you notice in the visualization?

Two things calls my attention, first of all is that the business loans amount average doesn't decrease the same as the other categories. Second one is how impressive is the raising of loans and its amount in the last years.

What relationships do you notice?

It seems there is a relationship between number of loans and the amount.

What do you think is the main takeaway from this visualization?

As told before, the number of loans and the amount relationship.

Is there something you don’t understand in the graphic?

No.

### Feedback 2

What do you notice in the visualization?

In 2008 the amount decrease, not the number of loans. Next year both parameters decreases ant then becomes a very heavy rising.  

What questions do you have about the data?

None.

What relationships do you notice?

It seems the number of loans and the amount are related.

What do you think is the main takeaway from this visualization?
The raising in loans graned and its amount since 2009.

Is there something you don’t understand in the graphic?

Right Y-axis is weird.

### Feedback 3

What do you notice in the visualization?

Two graphs representing the aggregate and mean of the number of loans and amount during the last crisis in USA for three different factors.

What questions do you have about the data?

The unit of the amount is not specified (I supose they are dollars).
The right Y-axis begins in 4061. Why?
I don't know how the number of loans are almost the same in each category each year. I would thought medical loans doesn't suffer the crisis the same way as the others do.

What relationships do you notice?

There's a relationship between number of loans and the amount.

## Resources

- [Dimple.js](http://dimplejs.org/) Reference for build the graph
- [Propser](https://www.prosper.com/) Company offering the dataset
- [Chart suggestions](http://extremepresentation.typepad.com/files/choosing-a-good-chart-09.pdf)
- [Making a bar chart](http://alignedleft.com/tutorials/d3/making-a-bar-chart) Sampling for design
- [Stackoverflow](http://stackoverflow.com/) Look for dimple questions
