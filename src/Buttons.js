import Button from "./Button"
import classes from './Buttons.module.css';
const Buttons = (props) => {
    return (
        <div className={classes.buttons}>
            <Button onClick={props.addData} type="submit">Dodaj</Button>
        </div>
    )
}

export default Buttons