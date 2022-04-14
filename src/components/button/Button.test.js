import { render } from "react-dom";
import Button from "./Button";
import ReactDOM from 'react-dom';

describe("Button", () => {
    test("It renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Button/>, div)
    })

    test("Renders button label correctly", () => {
        const {getTestById} = render(<Button label="Click me"></Button>);
        expect(getTestById('button')).toHaveTextContent("Click me");
    })
})