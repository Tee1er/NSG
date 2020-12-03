# NSG Handbook

### Population/Demographics

NSG simulates 16 different people, each with their own independent lives - they are listed in `people.json`. As a group, these people (the "Population") are used as proxies to represent your country's population as a whole. Each person is represented equally in the model - so you should cater to *all* of them. This approach, used for basically the same reasons as the Electoral College, is meant to prevent you from exclusively serving a couple groups while ignoring the others. Rebellion can be orchestrated by a small group of people. Be paranoid.

### Rebellion

Rebellion is the worst-case scenario for a failing leader - once your citizens rise up against you, it's likely game over for you and your government. So much of the game is concerned with managing your citizens (well, technically managing the Population) and keeping them content and happy.

Rebellion is dictated by the NSG Happiness Index, an average of the Happiness Index of each member of the Population; it is explained below:


> **- Inequality**: Inequality in NSG is calculated as the difference between the wealthiest Population member & the person that the Index is being calculated for.

> **- Government Representation**: This is a very important part, and it'll be 

> **- Freedom**: A composite formed of the following:
> - Freedom to Move: Is the person's movement restricted by legislature?
> - Freedom to Communicate: Is the person's communication with others restricted?
> - Freedom of Worship: If the person is religious, is their religious freedom restricted?

> It should be noted the the Freedom to Move and Freedom to Communicate limit the possibility of a rebellion growing, but they do *not* limit the possibility of one starting up.

All parts have equal weight in the total: each accounts for 25% of the total score.

As of right now, an NSG game in progress can only have one (1) rebellion at a time. The chances are mostly decided by the Happiness Index, but with some psuedo-random #'s thrown in.

**[(1 - Happiness Index / 10)^3] * Psuedorandom # between 0-1**  

Rebellion is of course exceedingly unlikely using this formula, so it's not hard to avoid it - it's much harder to do well than to simply *not lose*.

Rebellion is calculated every day in the daily Event Loop, which runs every 60s. Some Members of the Population are less likely to rebel than others - it'd be unreasonable to expect people with important positions within the government or with high class or wealth to give it up so easily.

You likely won't receive notice of the rebellion until A.) they stage a large-scale attack that your law enforcement investigates or B.) they grow sufficiently large enough to stage a rebellion.

A note, actually: per-person rebellion likelihood cannot be seen, but you can be relatively certain that the proletariat & middle classes will be more likely to rise up in protest. The percentage shown in the **Status** panel is an average of *all 16* Members. 



|  Status |Percentage Range   |   
|---|---|
|Go Back to your Bunker| >20%|
|Warning| >10%|
|Advisory| >5%|
|Moderate  |>2%   |   
|Low|<2%   |   


:point_up: totally overthought stuff by Tee1er