import { useRef, useState } from "react";
import { getAuthToken } from "../components/auth/auth";
import { getBackendUrl } from "../util/localUrlGeneration";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";

export default function HomePage() {
    // This component should be probably split to multiple smaller ones!
    const nickRef = useRef();
    const textRef = useRef();
    const [reportSuccess, setReportSuccess] = useState(false);

    async function sendReport(event) {
        event.preventDefault();
        const fetchUrl = getBackendUrl() + "/reports";

        const reportData = {
            nick: nickRef.current.value,
            text: textRef.current.value,
        };
        console.log("report");
        console.log(reportData);

        const response = await fetch(fetchUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reportData),
        });

        if (!response.ok) {
            throw new Error("Failed to send report");
        }

        setReportSuccess(true);
    }

    return (
        <div className={classes.index}>
            <header className={classes.mainHeader}>
                <div
                    className={`${classes.container} ${classes.headerContainer}`}
                >
                    <img src="qr-code.jpg" alt="qr-code" />
                    <h1>eNapiwek</h1>
                    <p>Aplikacja do napiwków QR</p>
                    <Link to="auth">Zarejestruj się</Link>
                </div>
            </header>
            <div className={classes.container}>
                <section className={classes.comparison}>
                    <div>
                        <h2>Razem z nami</h2>
                        <p>Pożegnaj</p>
                        <ul>
                            <li>
                                <span>Pożegnaj</span> niezręczne sytuacje
                            </li>
                            <li>
                                <span>Pożegnaj</span> kolejne dni bez napiwków
                            </li>
                            <li>
                                <span>Pożegnaj</span> negatywne myśli
                            </li>
                        </ul>
                    </div>
                    <img
                        src="waving-person.png"
                        alt="waving-person"
                        className={classes.picturePoints}
                    />
                </section>

                <section className={`${classes.comparison} ${classes.good}`}>
                    <img
                        src="happy-person.png"
                        alt="happy-person"
                        className={classes.picturePoints}
                    />
                    <div>
                        <h2>Razem z nami</h2>
                        <p>Przywitaj</p>
                        <ul>
                            <li>
                                <span>Przywitaj</span> zręczne sytuacje
                            </li>
                            <li>
                                <span>Przywitaj</span> bezgotówkowe napiwki
                            </li>
                            <li>
                                <span>Przywitaj</span> wygodę
                            </li>
                        </ul>
                    </div>
                </section>

                <section className={classes.description}>
                    <div>
                        <h3>eNapiwek</h3>
                        <p>
                            Nasz zespół stworzył platformę dla kelnerów do
                            łatwiejszej obsługi napiwków bezgotówkowo. Opiera
                            się na okazywaniu przez pracownika kodu QR który to
                            przekierowuje klienta do strony z możliwością
                            wybrania i zapłaty napiwku, pozostawienia komentarza
                            co do usługi oraz oceny. Pracownik ma wgląd do
                            komentarzy, oraz na statystyki swoich zarobków.
                        </p>
                    </div>
                </section>

                <section className={classes.steps}>
                    <h2>Jak to działa?</h2>
                    <div className={classes.stepsListContainer}>
                        <img
                            src="handshake.png"
                            alt="handshake"
                            className={classes.pictureSteps}
                        />
                        <ol>
                            <li>Kelner daje kod QR klientowi</li>
                            <li>Klient skanuje kod QR</li>
                            <li>Klient pisze recenzję</li>
                            <li>Klient pisze napiwek</li>
                            <li>Kelner ma pieniądze na koncie</li>
                        </ol>
                    </div>
                </section>

                <section className={classes.trusted}>
                    <h2>Zaufali nam</h2>

                    <div className={classes.trustedGrid}>
                        <img src="qr-code.jpg" alt="qr-code" />
                        <img src="qr-code.jpg" alt="qr-code" />
                        <img src="qr-code.jpg" alt="qr-code" />
                        <img src="qr-code.jpg" alt="qr-code" />
                    </div>
                </section>
            </div>

            <section className={classes.contact}>
                <h3>Zainteresowany?</h3>
                <p>Napisz do nas aby dowiedzieć się szczegółów</p>
                <form onSubmit={sendReport} className={classes.contactForm}>
                    <input
                        ref={nickRef}
                        placeholder="Imię"
                        minLength={1}
                        maxLength={20}
                        required
                    />
                    <textarea
                        ref={textRef}
                        placeholder="Pytanie, pomysł, propozycja..."
                        minLength={1}
                        maxLength={1500}
                        required
                    />
                    <button type="submit">Wyślij</button>
                    {reportSuccess && (
                        <div className={classes.reportSuccess}>
                            Pomyślnie wysłano wiadomość
                        </div>
                    )}
                </form>
            </section>

            <footer className={classes.footer}>
                Wszelkie prawa zastrzeżone
            </footer>
        </div>
    );
}
