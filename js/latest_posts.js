const loadPost = async () => {
    togglePostSpinner(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    const postContainer = document.getElementById('post-container');
    data.forEach((item) => {
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="border-2 border-gray-200 p-6 rounded-3xl">
                    <figure class=" items-center mb-3 "><img class="rounded-3xl" src="${item.cover_image}" alt="" />
                    </figure>
                    <div class="card-body gap-3 p-0">
                        <div class="flex gap-3">
                            <img src="images/cal.svg" alt="">
                            <div>
                                <p class="text-gray-500 text-sm items-center">${item.author.posted_date ? item.author.posted_date : "No publish date"}</p>
                            </div>
                        </div>
                        <h2 class="card-title text-lg font-extrabold">${item.title}</h2>
                        <p class="text-gray text-base">${item.description}</p>
                        <div class="flex gap-3">
                            <div class="avatar">
                                <div class="w-11 rounded-full">
                                    <img src="${item.profile_image}" />
                                </div>
                            </div>
                            <div>
                                <p class="text-base font-bold">${item.author.name}</p>
                                <p class="text-gray-500 text-sm">${item.author.designation ? item.author.designation : "Unknown"}</p>
                            </div>
                        </div>
                    </div>
                </div>
        `

        setTimeout(function () {

            postContainer.appendChild(div);
            togglePostSpinner(false);
        }, 2000);


    })

}

const togglePostSpinner = (isLoading) => {
    const loadingSpinner2 = document.getElementById('loading-spinner2');
    if (isLoading) {
        loadingSpinner2.classList.remove('hidden');
    }
    else {
        loadingSpinner2.classList.add('hidden');
    }
}
loadPost();