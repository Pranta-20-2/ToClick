const loadDiscuss = async (catName) => {
    toggleLoadingSpinner(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${catName}`);
    
    const data = await res.json();
    const allData = data.posts;
    const discussContainer = document.getElementById('discuss-container')
    discussContainer.innerHTML = '';
    allData.forEach((post) => {
        const div = document.createElement('div')

        div.innerHTML = `
        <div class="card card-side bg-gray-100  hover:bg-[#797dfc1a] rounded-[32px]">
                        <div class=" w-20 h-20  mt-6 ml-6 rounded-full">
                            <span id="indicator-col" class=" h-4 indicator-item ml-16 -mb-3 relative badge badge-secondary border-0 ${post.isActive ? 'bg-green-500' : 'bg-red-500'}"></span>
                            <img class="rounded-full" src="${post.image}" />
                        </div>
                        <div class="card-body space-y-2">
                            <div class="flex gap-5">
                                <h2> # ${post.category}</h2>
                                <p> Author: ${post.author.name}</p>
                            </div>
                            <div class="space-y-2">
                                <p class="text-[20px] font-bold">${post.title}</p>
                                <p>${post.description}</p>
                            </div>
                            <div class="dashed-line"></div>
                            <div class="flex flex-col md:flex-row lg:flex-row lg:justify-between gap-5">
                                <div class="flex gap-5 items-center">
                                    <div class="flex gap-2 items-center">
                                        <img src="./images/tabler-icon-1.svg" alt="" srcset="" />
                                        <span>${post.comment_count}</span>
                                    </div>
                                    <div class="flex gap-2 items-center">
                                        <img src="./images/tabler-icon-2.svg" alt="" srcset="" />
                                        <span>${post.view_count}</span>

                                    </div>
                                    <div class="flex gap-2 items-center">
                                        <img src="./images/tabler-icon-3.svg" alt="" srcset="" />
                                        <span>${post.posted_time}</span>
                                        <p>min</p>
                                    </div>
                                </div>
                                <div onclick="emailButton('${post.title.replace(/'/g, '@')}','${post.view_count}')"
                                    class="flex justify-end items-end">
                                    <button class=" bg-none">
                                        <img src="./images/email 1.svg" alt="" />
                                    </button>
                                </div>
                            </div>

                        </div>
        </div>
            
        `
        setTimeout(function () {
            discussContainer.appendChild(div);
            toggleLoadingSpinner(false);
        }, 2000);


    });
}

const handleDiscussSearch = () => {
    const value = document.getElementById("discuss-search-box").value;
    let lowercaseValue = value.toLowerCase();

    if (value && (lowercaseValue === 'coding' || lowercaseValue === 'comedy' || lowercaseValue === 'music')) {
        loadDiscuss(value);
    } 
    else {
        alert('Enter a valid name, which should be Coding, Comedy, or Music.');
    }



}
let count = 0;
const emailButton = async (title, viewCount) => {
    count = count + 1;
    const readValue = document.getElementById('read-value');
    readValue.innerText = count;
    const sideCont = document.getElementById('side-cont');
    const div = document.createElement('div');
    div.innerHTML =
        `
    <div id="side-value" class="collapse collapse-close border border-base-300 bg-base-200">
        <div class=" bg-white flex justify-between p-4">
            <div class="text-lg font-semibold">
                ${title.replace('@', "'")}
            </div>
            <div class="flex items-center">
                <div class="">
                    <img src="images/tabler-icon-2.svg" alt="">
                </div>
                <div>
                    <p class="pl-2">${viewCount}</p>
                </div>
            </div>
            
        </div>
    </div>
    `
    sideCont.appendChild(div);

}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner1 = document.getElementById('loading-spinner1');
    if (isLoading) {
        loadingSpinner1.classList.remove('hidden');
    }
    else {
        loadingSpinner1.classList.add('hidden');
    }
}
loadDiscuss('');
