<script>
    import { onMount } from "svelte";
    let currencies = []
    let firstCurrency = 'USD'
    let secondCurrency = 'RUB'
    let firstValue = 1
    let secondValue = 1
    let firstQuantity = 1
    let secondQuantity = 1

    // Эта функция выполняется при первоначальной загрузке страницы, возвращает массив объектов стоимости других валют по отношению к выбранной по умолчанию первой, далее конвертирует доллары в рубли(тк это задано поумолчанию, количество долларов единичное(также выбрано поумолчанию))
    onMount(
        async function () {
        const response = await fetch(`https://open.er-api.com/v6/latest/${firstCurrency}`)
        const data = await response.json()
        currencies = Object.entries(data.rates).map(([key,value]) => {
            return {key, value}
        })
        getSecondValue(secondCurrency)
    }
    )

    // Эта функция выполняется при изменении первой валюты, возвращает массив объектов стоимости других валют по отношению к выбранной первой
    async function firstSearch(firstCurrency, searchCurrency) {
        const response = await fetch(`https://open.er-api.com/v6/latest/${firstCurrency}`)
        const data = await response.json()
        currencies = Object.entries(data.rates).map(([key,value]) => {
            return {key, value}
        })
        getSecondValue(searchCurrency, firstQuantity)
        
    }

    // Эта функция конвертирует стоимость первой валюты во второй, учитывая количество первой
    function getSecondValue(searchCurrency, firstQuantity=1) {
        currencies.map((obj) => {
            if (obj.key == searchCurrency) {
                secondValue = firstQuantity*Number(obj.value)
            }
        })
    }

    // Эта функция конвертирует стоимость второй валюты в первой, учитывая количество второй
    function getFirstValue (searchCurrency, secondQuantity = 1) {
        currencies.map((obj) => {
            if (obj.key == searchCurrency) {
                console.log(obj.value);
                firstValue = secondQuantity*(1/Number(obj.value))
            }
        })
    }
</script>

<select bind:value={firstCurrency} on:change={(event) => {
        firstSearch(firstCurrency, secondCurrency)
        firstCurrency = event.target.value
    }}>
    {#each currencies as currency}
        <option>{currency.key}</option>
    {/each}
</select>

<p class="between">Конвертировать в</p>


<select bind:value={secondCurrency} on:change={(event) => {
    secondCurrency = event.target.value
    getSecondValue(secondCurrency, firstQuantity)
}}>
{#each currencies as currency}
    <option>{currency.key}</option>
{/each}
</select>

<input on:input={(event) => {
    firstQuantity = Number(event.target.value)
    getSecondValue(secondCurrency, firstQuantity)
}} 
    placeholder={`Введине значение в ${firstCurrency}`}
    bind:value={firstValue}
/>
<div class="betweenInput">{firstCurrency} в данный момент составляет в валюте  {secondCurrency}</div>
<input bind:value={secondValue} placeholder={`Введине значение в ${secondCurrency}`} on:input={(event) => {
    secondQuantity = Number(event.target.value)
    getFirstValue(secondCurrency, secondQuantity)
}}/> 
<div class="betweenInput">единиц</div>

<style>
    p {
        font-size: 20px;
    }

    .between {
        padding-left: 200px;
        padding-right: 200px;
        align-self: center;
    }

    .betweenInput {
        padding-top: 27px;
        padding-left: 20px;
        padding-right: 20px;
    }

    select {
        position: relative;
	    width: 300px;
	    margin-right: 1rem;
        padding: 1rem;
	    cursor: pointer;
	    border-radius: 5px;
	    background-color: #ddd;
	    list-style: none;
        border: none;
        text-align: center;
        font-size: 30px;
    }

    input {
        text-align: center;
        max-width: 100px;
        height: 35px;
        /* margin-left: 50px; */
        margin-top: 20px;
        font-size: 15px;
        background-color: #c0beb9;
        border:none;
        font-size: 18px;
    }
    
    .output {
        padding-top: 50px;
        margin: auto;
    }
    
</style>