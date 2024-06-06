/*!
 * Lightbox for Bootstrap 3 by @ashleydw
 * https://github.com/ashleydw/lightbox
 *
 * License: https://github.com/ashleydw/lightbox/blob/master/LICENSE
 */
(function () {
  "use strict";
  var a, b;
  (a = jQuery),
    (b = function (b, c) {
      var d,
        e,
        f,
        g = this;
      return (
        (this.options = a.extend(
          { title: null, footer: null, remote: null },
          a.fn.ekkoLightbox.defaults,
          c || {}
        )),
        (this.$element = a(b)),
        (d = ""),
        (this.modal_id = this.options.modal_id
          ? this.options.modal_id
          : "ekkoLightbox-" + Math.floor(1e3 * Math.random() + 1)),
        (f =
          '<div class="modal-header"' +
          (this.options.title || this.options.always_show_close
            ? ""
            : ' style="display:none"') +
          '><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">' +
          (this.options.title || "&nbsp;") +
          "</h4></div>"),
        (e =
          '<div class="modal-footer"' +
          (this.options.footer ? "" : ' style="display:none"') +
          ">" +
          this.options.footer +
          "</div>"),
        a(document.body).append(
          '<div id="' +
            this.modal_id +
            '" class="ekko-lightbox modal fade" tabindex="-1"><div class="modal-dialog"><div class="modal-content">' +
            f +
            '<div class="modal-body"><div class="ekko-lightbox-container"><div></div></div></div>' +
            e +
            "</div></div></div>"
        ),
        (this.modal = a("#" + this.modal_id)),
        (this.modal_dialog = this.modal.find(".modal-dialog").first()),
        (this.modal_content = this.modal.find(".modal-content").first()),
        (this.modal_body = this.modal.find(".modal-body").first()),
        (this.lightbox_container = this.modal_body
          .find(".ekko-lightbox-container")
          .first()),
        (this.lightbox_body = this.lightbox_container
          .find("> div:first-child")
          .first()),
        this.showLoading(),
        (this.modal_arrows = null),
        (this.border = {
          top:
            parseFloat(this.modal_dialog.css("border-top-width")) +
            parseFloat(this.modal_content.css("border-top-width")) +
            parseFloat(this.modal_body.css("border-top-width")),
          right:
            parseFloat(this.modal_dialog.css("border-right-width")) +
            parseFloat(this.modal_content.css("border-right-width")) +
            parseFloat(this.modal_body.css("border-right-width")),
          bottom:
            parseFloat(this.modal_dialog.css("border-bottom-width")) +
            parseFloat(this.modal_content.css("border-bottom-width")) +
            parseFloat(this.modal_body.css("border-bottom-width")),
          left:
            parseFloat(this.modal_dialog.css("border-left-width")) +
            parseFloat(this.modal_content.css("border-left-width")) +
            parseFloat(this.modal_body.css("border-left-width")),
        }),
        (this.padding = {
          top:
            parseFloat(this.modal_dialog.css("padding-top")) +
            parseFloat(this.modal_content.css("padding-top")) +
            parseFloat(this.modal_body.css("padding-top")),
          right:
            parseFloat(this.modal_dialog.css("padding-right")) +
            parseFloat(this.modal_content.css("padding-right")) +
            parseFloat(this.modal_body.css("padding-right")),
          bottom:
            parseFloat(this.modal_dialog.css("padding-bottom")) +
            parseFloat(this.modal_content.css("padding-bottom")) +
            parseFloat(this.modal_body.css("padding-bottom")),
          left:
            parseFloat(this.modal_dialog.css("padding-left")) +
            parseFloat(this.modal_content.css("padding-left")) +
            parseFloat(this.modal_body.css("padding-left")),
        }),
        this.modal
          .on("show.bs.modal", this.options.onShow.bind(this))
          .on("shown.bs.modal", function () {
            return g.modal_shown(), g.options.onShown.call(g);
          })
          .on("hide.bs.modal", this.options.onHide.bind(this))
          .on("hidden.bs.modal", function () {
            return (
              g.gallery && a(document).off("keydown.ekkoLightbox"),
              g.modal.remove(),
              g.options.onHidden.call(g)
            );
          })
          .modal("show", c),
        this.modal
      );
    }),
    (b.prototype = {
      modal_shown: function () {
        var b,
          c = this;
        return this.options.remote
          ? ((this.gallery = this.$element.data("gallery")),
            this.gallery &&
              ((this.gallery_items =
                "document.body" === this.options.gallery_parent_selector ||
                "" === this.options.gallery_parent_selector
                  ? a(document.body).find(
                      '*[data-toggle="lightbox"][data-gallery="' +
                        this.gallery +
                        '"]'
                    )
                  : this.$element
                      .parents(this.options.gallery_parent_selector)
                      .first()
                      .find(
                        '*[data-toggle="lightbox"][data-gallery="' +
                          this.gallery +
                          '"]'
                      )),
              (this.gallery_index = this.gallery_items.index(this.$element)),
              a(document).on("keydown.ekkoLightbox", this.navigate.bind(this)),
              this.options.directional_arrows &&
                this.gallery_items.length > 1 &&
                (this.lightbox_container.prepend(
                  '<div class="ekko-lightbox-nav-overlay"><a href="#" class="' +
                    this.strip_stops(this.options.left_arrow_class) +
                    '"></a><a href="#" class="' +
                    this.strip_stops(this.options.right_arrow_class) +
                    '"></a></div>'
                ),
                (this.modal_arrows = this.lightbox_container
                  .find("div.ekko-lightbox-nav-overlay")
                  .first()),
                this.lightbox_container
                  .find("a" + this.strip_spaces(this.options.left_arrow_class))
                  .on("click", function (a) {
                    return a.preventDefault(), c.navigate_left();
                  }),
                this.lightbox_container
                  .find("a" + this.strip_spaces(this.options.right_arrow_class))
                  .on("click", function (a) {
                    return a.preventDefault(), c.navigate_right();
                  }))),
            this.options.type
              ? "image" === this.options.type
                ? this.preloadImage(this.options.remote, !0)
                : "youtube" === this.options.type &&
                  (b = this.getYoutubeId(this.options.remote))
                ? this.showYoutubeVideo(b)
                : "vimeo" === this.options.type
                ? this.showVimeoVideo(this.options.remote)
                : "instagram" === this.options.type
                ? this.showInstagramVideo(this.options.remote)
                : "url" === this.options.type
                ? this.showInstagramVideo(this.options.remote)
                : this.error(
                    'Could not detect remote target type. Force the type using data-type="image|youtube|vimeo|url"'
                  )
              : this.detectRemoteType(this.options.remote))
          : this.error("No remote target given");
      },
      strip_stops: function (a) {
        return a.replace(/\./g, "");
      },
      strip_spaces: function (a) {
        return a.replace(/\s/g, "");
      },
      isImage: function (a) {
        return a.match(
          /(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i
        );
      },
      isSwf: function (a) {
        return a.match(/\.(swf)((\?|#).*)?$/i);
      },
      getYoutubeId: function (a) {
        var b;
        return (
          (b = a.match(
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
          )),
          b && 11 === b[2].length ? b[2] : !1
        );
      },
      getVimeoId: function (a) {
        return a.indexOf("vimeo") > 0 ? a : !1;
      },
      getInstagramId: function (a) {
        return a.indexOf("instagram") > 0 ? a : !1;
      },
      navigate: function (a) {
        if (((a = a || window.event), 39 === a.keyCode || 37 === a.keyCode)) {
          if (39 === a.keyCode) return this.navigate_right();
          if (37 === a.keyCode) return this.navigate_left();
        }
      },
      navigateTo: function (b) {
        var c, d;
        return 0 > b || b > this.gallery_items.length - 1
          ? this
          : (this.showLoading(),
            (this.gallery_index = b),
            this.options.onNavigate.call(this, this.gallery_index),
            (this.$element = a(this.gallery_items.get(this.gallery_index))),
            this.updateTitleAndFooter(),
            (d =
              this.$element.attr("data-remote") || this.$element.attr("href")),
            this.detectRemoteType(d, this.$element.attr("data-type") || !1),
            this.gallery_index + 1 < this.gallery_items.length &&
            ((c = a(this.gallery_items.get(this.gallery_index + 1), !1)),
            (d = c.attr("data-remote") || c.attr("href")),
            "image" === c.attr("data-type") || this.isImage(d))
              ? this.preloadImage(d, !1)
              : void 0);
      },
      navigate_left: function () {
        return 1 !== this.gallery_items.length
          ? (0 === this.gallery_index
              ? (this.gallery_index = this.gallery_items.length - 1)
              : this.gallery_index--,
            this.options.onNavigate.call(this, "left", this.gallery_index),
            this.navigateTo(this.gallery_index))
          : void 0;
      },
      navigate_right: function () {
        return 1 !== this.gallery_items.length
          ? (this.gallery_index === this.gallery_items.length - 1
              ? (this.gallery_index = 0)
              : this.gallery_index++,
            this.options.onNavigate.call(this, "right", this.gallery_index),
            this.navigateTo(this.gallery_index))
          : void 0;
      },
      detectRemoteType: function (a, b) {
        var c;
        return "image" === b || this.isImage(a)
          ? ((this.options.type = "image"), this.preloadImage(a, !0))
          : "youtube" === b || (c = this.getYoutubeId(a))
          ? ((this.options.type = "youtube"), this.showYoutubeVideo(c))
          : "vimeo" === b || (c = this.getVimeoId(a))
          ? ((this.options.type = "vimeo"), this.showVimeoVideo(c))
          : "instagram" === b || (c = this.getInstagramId(a))
          ? ((this.options.type = "instagram"), this.showInstagramVideo(c))
          : "url" === b || (c = this.getInstagramId(a))
          ? ((this.options.type = "instagram"), this.showInstagramVideo(c))
          : ((this.options.type = "url"), this.loadRemoteContent(a));
      },
      updateTitleAndFooter: function () {
        var a, b, c, d;
        return (
          (c = this.modal_content.find(".modal-header")),
          (b = this.modal_content.find(".modal-footer")),
          (d = this.$element.data("title") || ""),
          (a = this.$element.data("footer") || ""),
          d || this.options.always_show_close
            ? c
                .css("display", "")
                .find(".modal-title")
                .html(d || "&nbsp;")
            : c.css("display", "none"),
          a ? b.css("display", "").html(a) : b.css("display", "none"),
          this
        );
      },
      showLoading: function () {
        return (
          this.lightbox_body.html('<div class="modal-loading">Loading..</div>'),
          this
        );
      },
      showYoutubeVideo: function (a) {
        var b, c, d;
        return (
          (b = 560 / 315),
          (d = this.$element.data("width") || 560),
          (d = this.checkDimensions(d)),
          (c = d / b),
          this.resize(d),
          this.lightbox_body.html(
            '<iframe width="' +
              d +
              '" height="' +
              c +
              '" src="//www.youtube.com/embed/' +
              a +
              '?badge=0&autoplay=1&html5=1" frameborder="0" allowfullscreen></iframe>'
          ),
          this.options.onContentLoaded.call(this),
          this.modal_arrows ? this.modal_arrows.css("display", "none") : void 0
        );
      },
      showVimeoVideo: function (a) {
        var b, c, d;
        return (
          (b = 500 / 281),
          (d = this.$element.data("width") || 560),
          (d = this.checkDimensions(d)),
          (c = d / b),
          this.resize(d),
          this.lightbox_body.html(
            '<iframe width="' +
              d +
              '" height="' +
              c +
              '" src="' +
              a +
              '?autoplay=1" frameborder="0" allowfullscreen></iframe>'
          ),
          this.options.onContentLoaded.call(this),
          this.modal_arrows ? this.modal_arrows.css("display", "none") : void 0
        );
      },
      showInstagramVideo: function (a) {
        var b;
        return (
          (b = this.$element.data("width") || 612),
          (b = this.checkDimensions(b)),
          this.resize(b),
          this.lightbox_body.html(
            '<iframe width="' +
              b +
              '" height="' +
              b +
              '" src="' +
              this.addTrailingSlash(a) +
              'embed/" frameborder="0" allowfullscreen></iframe>'
          ),
          this.options.onContentLoaded.call(this),
          this.modal_arrows ? this.modal_arrows.css("display", "none") : void 0
        );
      },
      loadRemoteContent: function (b) {
        var c,
          d,
          e = this;
        return (
          (d = this.$element.data("width") || 560),
          this.resize(d),
          (c = this.$element.data("disableExternalCheck") || !1),
          console.log(c, this.isExternal(b)),
          c || this.isExternal(b)
            ? (this.lightbox_body.html(
                '<iframe width="' +
                  d +
                  '" height="' +
                  d +
                  '" src="' +
                  b +
                  '" frameborder="0" allowfullscreen></iframe>'
              ),
              this.options.onContentLoaded.call(this))
            : this.lightbox_body.load(
                b,
                a.proxy(function () {
                  return e.$element.trigger("loaded.bs.modal");
                })
              ),
          this.modal_arrows ? this.modal_arrows.css("display", "block") : void 0
        );
      },
      isExternal: function (a) {
        var b;
        return (
          (b = a.match(
            /^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/
          )),
          "string" == typeof b[1] &&
          b[1].length > 0 &&
          b[1].toLowerCase() !== location.protocol
            ? !0
            : "string" == typeof b[2] &&
              b[2].length > 0 &&
              b[2].replace(
                new RegExp(
                  ":(" +
                    { "http:": 80, "https:": 443 }[location.protocol] +
                    ")?$"
                ),
                ""
              ) !== location.host
            ? !0
            : !1
        );
      },
      error: function (a) {
        return this.lightbox_body.html(a), this;
      },
      preloadImage: function (b, c) {
        var d,
          e = this;
        return (
          (d = new Image()),
          (null == c || c === !0) &&
            ((d.onload = function () {
              var b;
              return (
                (b = a("<img />")),
                b.attr("src", d.src),
                b.addClass("img-responsive"),
                e.lightbox_body.html(b),
                e.modal_arrows && e.modal_arrows.css("display", "block"),
                e.resize(d.width),
                e.options.onContentLoaded.call(e)
              );
            }),
            (d.onerror = function () {
              return e.error("Failed to load image: " + b);
            })),
          (d.src = b),
          d
        );
      },
      resize: function (b) {
        var c;
        return (
          (c =
            b +
            this.border.left +
            this.padding.left +
            this.padding.right +
            this.border.right),
          this.modal_dialog.css("width", "auto").css("max-width", c),
          this.lightbox_container.find("a").css("padding-top", function () {
            return a(this).parent().height() / 2;
          }),
          this
        );
      },
      checkDimensions: function (a) {
        var b, c;
        return (
          (c =
            a +
            this.border.left +
            this.padding.left +
            this.padding.right +
            this.border.right),
          (b = document.body.clientWidth),
          c > b && (a = this.modal_body.width()),
          a
        );
      },
      close: function () {
        return this.modal.modal("hide");
      },
      addTrailingSlash: function (a) {
        return "/" !== a.substr(-1) && (a += "/"), a;
      },
    }),
    (a.fn.ekkoLightbox = function (c) {
      return this.each(function () {
        var d;
        return (
          (d = a(this)),
          (c = a.extend(
            {
              remote: d.attr("data-remote") || d.attr("href"),
              gallery_parent_selector: d.attr("data-parent"),
              type: d.attr("data-type"),
            },
            c,
            d.data()
          )),
          new b(this, c),
          this
        );
      });
    }),
    (a.fn.ekkoLightbox.defaults = {
      gallery_parent_selector: "*:not(.row)",
      left_arrow_class: ".glyphicon .glyphicon-chevron-left",
      right_arrow_class: ".glyphicon .glyphicon-chevron-right",
      directional_arrows: !0,
      type: null,
      always_show_close: !0,
      onShow: function () {},
      onShown: function () {},
      onHide: function () {},
      onHidden: function () {},
      onNavigate: function () {},
      onContentLoaded: function () {},
    });
}).call(this);
