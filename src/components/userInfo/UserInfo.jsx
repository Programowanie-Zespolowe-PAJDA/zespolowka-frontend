import classes from "./UserInfo.module.css";
import DataBox from "./DataBox";
import PasswordBox from "./PasswordBox";
import QRBox from "./QRBox";
import ChangeEmail from "./ChangeEmail";
import ChangeAccountNumber from "./ChangeAccountNumber.jsx";

export default function UserInfo({ info }) {
    return (
        <section className={classes.container}>
            <DataBox data={info} />
            <PasswordBox />
            <QRBox id={info.id} />
            <ChangeEmail oldEmail={info.mail} />
            <ChangeAccountNumber oldNumber={info.bankAccountNumber} />
        </section>
    );
}
