import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const VacationPath = () => {

    const addField = (e) => {
        // Stopping the function if the input field is empty.
        if(e.previousElementSibling.value.trim() === ""){
            return false;
        }

        // Creating the div container
        let div = document.createElement("div");
        div.setAttribute("class", "field");

        // Creating the input element.
        let field = document.createElement("TextField");
        field.setAttribute("id", "outlined-basic");
        field.setAttribute("label", "경유지");
        field.setAttribute("variant", "outlined");

        // Creating the button plus element.
        let plus = document.createElement("Button");
        plus.setAttribute("onClick", "addField(this)");
        plus.setAttribute("variant", "outlined");
        plus.setAttribute("color", "success");

        let plustext = document.createTextNode("+");
        plus.appendChild(plustext);

        // Creating the button minus element.
        let minus = document.createElement("Button");
        minus.setAttribute("onClick", "minusField(this)");
        minus.setAttribute("variant", "outlined");
        minus.setAttribute("color", "success");

        let minustext = document.createTextNode("-");
        minus.appendChild(minustext);

        // Adding the elements to the DOM.
        Stack.insertBefore(div, displayButton);
        div.appendChild(field);
        div.appendChild(plus);
        div.appendChild(minus);

        // Un hiding the minus sign.
        element.nextElementSibling.style.display ="block";

        // Hiding the plus sign.
        element.style.display = "none";

    };
    
    return (
        <>
            <Stack direction="row" spacing={2}>
                <Button variant="outlined" color="error">
                    -
                </Button>
                <Button variant="outlined" color="success">
                    +
                </Button>
            </Stack>
        </>
    )
}

export default VacationPath