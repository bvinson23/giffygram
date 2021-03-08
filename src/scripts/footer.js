export const Footer = () => {
    return `
        <footer class="footer">
            <div class="footer__item">
                <p>&copy 2021 Giffygram</p>
                Posts since <select id="yearSelection">
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                </select>
                <span id="postCount">0</span>
            </div>
        </footer>`
}