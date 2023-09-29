function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // The loader is now visible in the viewport
            setTimeout(function () {
                // Create and append new content
                for (var i = 0; i < 6; i++) {
                    var newDiv = `<div class="col-lg-6">
                        <div class="card card-transparent card-block card-stretch card-height blog-grid blog-single">
                           <div class="card-body p-0 position-relative">
                              <div class="image-block">
                                 <img src="images/blog/03.jpg" class="img-fluid rounded w-100" alt="blog-img"
                                    loading="lazy">
                              </div>
                              <div class="blog-description p-3">
                                 <div class="date"><a href="#" tabindex="-1">3 Month ago</a></div>
                                 <h5 class="mb-2">Containing coronavirus spread comes</h5>
                                 <div class="d-flex align-items-center justify-content-between position-right-side blog_like">
                                    <div class="like d-flex align-items-center">
                                        <i class="material-symbols-outlined pe-2 md-18 thumb_up">thumb_up</i><span class="number_of_like">20</span>&nbsp;like
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        </div>`
                    $('#append_here').append(newDiv);
                }
                // Re-observe the loader element
                observer.observe(entry.target);
            }, 3000); // 3000 milliseconds (3 seconds)
            observer.unobserve(entry.target); // Stop observing once appended
        }
    });
}

var options = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.1 // Trigger the callback when 10% of the loader is visible
};

var observer = new IntersectionObserver(handleIntersection, options);

var loader = document.querySelector('#image_loader img');
observer.observe(loader);

$(document).on('click', '.thumb_up', function () {

    const $blogContainer = $(this).closest('.blog_like');
    const $likeCount = $blogContainer.find('.number_of_like');
    let likeCountValue = parseInt($likeCount.text());

    if ($(this).hasClass('liked')) {
        $(this).removeClass('liked');
        likeCountValue -= 1;
    } else {
        $(this).addClass('liked');
        likeCountValue += 1;
    }

    $likeCount.text(likeCountValue);
    e.preventDefault();
});

$(document).on('click', '#block-2', function () {
    $('#create_post_form').attr('style', 'display:block')
    $('#post_content').attr('style', 'display:none')
    $('#image_loader').attr('style', 'display:none')
});

$(document).on('click', '#close_btn', function (e) {
    $('#create_post_form').attr('style', 'display:none')
    $('#post_content').attr('style', 'display:block')
    $('#image_loader').attr('style', 'display:block')
    e.preventDefault()
});

$(document).on('click', '.blog-single', function (e) {
    $('#myModal').modal('show');
    e.preventDefault();
});

$(document).on('click', '.delete_dropdown', function (e) {
    e.stopPropagation();
    e.preventDefault();
});

$(document).on('click', '.delete', function (e) {
    alert('Are you Sure')
    e.preventDefault();
});