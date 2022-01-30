export default function Footer() {
    return (
        <footer className="footer mt-auto">
            <div className="container py-3">
                <span className="text-muted">Coded by Spencer Creer using OpenWeather API
                    <a className="text-dark link-text mx-2" href="https://www.linkedin.com/in/spencer-creer-023246109/" target="_blank" style={{fontSize: "25px", color: 'black'}}><i className="fa fa-linkedin-square link-in" ></i></a>
                    <a className="text-dark link-text mx-2 pt-3" href="https://github.com/spencercreer" target="_blank"><i className="fa fa-github link-git" style={{fontSize: "25px"}}></i></a>
                </span>
            </div>
        </footer>
    )
}
