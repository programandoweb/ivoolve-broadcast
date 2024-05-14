import styles from "./page.module.css";
const Header=({title,params})=>{
    return  <>
                <div className={styles.description}>
                    <header>
                        Demo by <a href="https://programandoweb.net" target="_blank">programandoweb.net</a>
                    </header>
                    <p>
                        Software transmisor de órdenes                    
                    </p>
                    <div>                        
                        <h3>
                            {title}
                        </h3>
                        <h4>
                            {params.grupo}
                        </h4>
                    </div>                    
                </div>
            </>
}
export default Header;