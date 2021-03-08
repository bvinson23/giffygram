export const Footer = () => {
    return `
        <footer class="footer">
            <div class="footer__item>&copy2021 Brandon Vinson</div>
            <div class="footer__item">
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