# Fancy form
Create a currency swap form based on the template provided in the folder. A user would use this form to swap assets from one currency to another.

*You may use any third party plugin, library, and/or framework for this problem.*

1. You may add input validation/error messages to make the form interactive.
2. Your submission will be rated on its usage intuitiveness and visual attractiveness.
3. Show us your frontend development and design skills, feel free to totally disregard the provided files for this problem.
4. You may use this [repo](https://github.com/Switcheo/token-icons/tree/main/tokens) for token images, e.g. [SVG image](https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SWTH.svg).
5. You may use this [URL](https://interview.switcheo.com/prices.json) for token price information and to compute exchange rates (not every token has a price, those that do not can be omitted).

# TODO
- [ ] Create a global store to store exchange rate
- [ ] Exchange form on the top
- [ ] List of exchange rate will be presented as table below
- [ ] Create mock server with Vite (/exchange_rate, /token_icons (return url and token name))
- [ ] Require: submit button, loading icon