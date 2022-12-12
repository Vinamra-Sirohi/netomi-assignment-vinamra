const countriesApi =
  "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json";

const select = document.getElementById("selectCountry");
const selectState = document.getElementById("selectState");
let countries = [];

const fetchData = async () => {
  const res = await fetch(countriesApi);
  const options = await res.json();
  countries = [...options];

  for (let i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");

    el.textContent = opt.name;
    el.value = opt.code2;
    select.appendChild(el);
  }
};

const removeOptions = (selectElement) => {
  var i,
    L = selectElement.options.length - 1;
  for (i = L; i >= 0; i--) {
    selectElement.remove(i);
  }
};

const onChange = () => {
  const code = select.value;
  //code = CO
  const country = countries.find((count) => code == count.code2);
  const states = country.states;

  removeOptions(selectState);

  for (let j = 0; j < states.length; j++) {
    var sopt = states[j];
    var sel = document.createElement("option");
    sel.textContent = sopt.name;
    sel.value = sopt;
    selectState.appendChild(sel);
  }
};

fetchData();

const p = document.getElementById("error");
p.addEventListener("click", (e) => {
  e.preventDefault();
});

const onSubmit = () => {
  let isError = false;
  console.log(select.value, selectState.value, "check");
  if (select.value === "" || selectState.value === "") {
    isError = true;
  }
  let msg;
  if (isError) {
    msg = {
      Name: { Error: "Select all fields" },
    };
  } else {
    msg = {
      success: "All fields are valid",
    };
  }

  p.innerHTML = `Result : ${JSON.stringify(msg)}`;
};
