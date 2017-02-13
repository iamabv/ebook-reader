angular.module("gallery", [])

.controller('AppController', function ($scope) {
    $scope.imageList = [
        {
            url: 'http://ebookarchitects.com/wp-content/gallery/fixed-layout-non-fiction/fixednonfiction04.png',
            name: 'ebook',
            openpdfurl: "http://htchttp.s3.amazonaws.com/books/epub_3_best_practices.pdf"
    },
        {
            url: "http://www.bookpublishersnetwork.com/sites/default/files/self-publishing-ebook-services_0.jpg",
            openpdfurl: "http://htchttp.s3.amazonaws.com/books/epub_3_best_practices.pdf"
      }
  ];

    $scope.bookmarks = [
        {
            title: 'Smashing Magazine',
            url: 'http://smashingmagazine.com',
            category: 'Web Design',
            likes: 2
    },
        {
            title: 'Reddit',
            url: 'http://reddit.com',
            category: 'Community',
            likes: 1
    },
        {
            title: 'CNN',
            url: 'http://cnn.com',
            category: 'News',
            likes: 10
    }
  ];

    $scope.increment = function ($index) {
        $scope.likes++;
    };

    $scope.addBookmark = function () {
            $scope.bookmarks.push({
                title: $scope.site_name,
                url: $scope.site_url,
                category: $scope.site_category,
                likes: 0
            });
            $scope.site_name = '';
            $scope.site_url = '';
            $scope.site_category = '';
        },

        $scope.deleteBookmark = function (id) {
            var bookmark = $scope.bookmarks[id];
            $scope.bookmarks.splice(id, 1);
        }
})

.directive('galleryExample', function ($interval, $window) {

    return {
        restrict: 'A',
        templateUrl: 'showImage.html',
        scope: {
            images: '='
        },
        link: function (scope, element, attributes) {
            // Initialise the nowshowing variable to show the first image.
            scope.nowShowing = 0;

            // Set an interval to show the next image every couple of seconds.
            $interval(function showNext() {
                // Make sure we loop back to the start.
                if (scope.nowShowing != scope.images.length - 1) {
                    scope.nowShowing++;
                } else {
                    scope.nowShowing = 0;
                }
            }, 5000);

            // Image click behaviour
            scope.openInNewWindow = function (index) {
                $window.open(scope.images[index].openpdfurl, "_blank");
            }
        }
    };


});
