


// changing logo color 

anime({
    targets: ".images path",
    fill: "rgb(89, 130, 231)",
    duration: 1000,
    loop: true,
    direction: "alternate",
    delay: anime.stagger(1000, {start: 1000})
})



// animate blogs in blog section

let template = Handlebars.compile(
    `
        <div class="photos">
            <div class="photo-and-loupe">
                <img src="./images/bigger-photo.jpg" alt="photo1">

                <svg viewBox="0 0 66 66">
                    <circle cx="33" cy="33" r="33" fill="white"/>
                    <circle cx="31" cy="31" r="7" fill="transparent" stroke="#A7AAC6" stroke-width="2"/>
                    <line stroke="#A7AAC6" x1="36" y1="35" x2="44" y2="42" stroke="#A7AAC6" stroke-width="2"/>
                </svg>
                </div>

            <div class="column">
                <img src="./images/smaller-photo1.jpg" alt="photo2" style="margin-bottom: 16px;">
                <img src="./images/smaller-photo2.jpg" alt="photo3">
            </div>
        </div>

        <div class="description">
            <h2>{{heading}}</h2>

            <p>{{text}}</p>

            <div class="buttons">
                <button class="read-button">Read now</button>
                <button class="add-button">Add to your bookmarks</button>
            </div>
        </div>
    `
    );

let leftArrow = document.getElementById("left-arrow");
let rightArrow = document.getElementById("right-arrow");

let order = [
    {
        blogId: "first",
        indicatorClassName: "first",
        heading: "Heading1", 
        text: "Text1"
    },
    {
        blogId: "second",
        indicatorClassName: "second",
        heading: "Heading2",
        text: "Text2"
    },
    {
        blogId: "third",
        indicatorClassName: "third",
        heading: "Heading3",
        text: "Text3"
    }
];


function changeIndCol(color, indicatorClass) {
    anime({
        targets: `#blog-dots .${indicatorClass}`,
        fill: color,
        duration: 1000,
    })
}

function showBlog(object, order, arrow) {

    let blogExample = document.createElement("div");
    blogExample.className = "blog-example";
    blogExample.id = order;
    blogExample.innerHTML = template(object);

    leftArrow.after(blogExample);

    changeIndCol("#5283FF", order)
    
    blogExample.style.left = arrow == "right" ? "100vw" : "-100vw";

    blogExample.animate([
        {left: 0}
    ], {
        duration: 1000,
        fill: "forwards"
    })
}

function showBlogAndMakeIndicatorGray(heading, text, order, arrow, indicatorClass) {
    showBlog({heading: heading, text: text}, order, arrow);
    changeIndCol("#D1D6E3", indicatorClass);
}

function removeBlog(arrow) {
    let blogExample = document.getElementsByClassName("blog-example")[0];
    let id = blogExample.id;

    blogExample.animate([
        {left: arrow == "right" ?  "-100vw" : "100vw"}
    ], {
        duration: 1000,
        fill: "forwards"
    })

    setTimeout(() => {
        blogExample.remove();
        
        for (let i = 0; i < 3; i++) {
            if (arrow == "right") {
                if (order[i].blogId == id && i != 2) {
                    showBlogAndMakeIndicatorGray(order[i+1].heading, order[i+1].text, order[i+1].indicatorClassName, arrow, order[i].indicatorClassName);
                } else if (order[i].blogId == id && i == 2) {
                    showBlogAndMakeIndicatorGray(order[0].heading, order[0].text, order[0].indicatorClassName, arrow, order[2].indicatorClassName);
                }
            } else {
                if (order[i].blogId == id && i != 0) {
                    showBlogAndMakeIndicatorGray(order[i-1].heading, order[i-1].text, order[i-1].indicatorClassName, arrow, order[i].indicatorClassName);
                } else if (order[i].blogId == id && i == 0) {
                    showBlogAndMakeIndicatorGray(order[2].heading, order[2].text, order[2].indicatorClassName, arrow, order[0].indicatorClassName);
                }
            }
        }
    }, 1000);
}


rightArrow.onclick = () => {
    removeBlog("right");
}

leftArrow.onclick = () => {
    removeBlog("left");
}

showBlog({heading: "Heading1", text: "Text1"}, "first", "right");