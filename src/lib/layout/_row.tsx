import { Component, onMount, createSignal, onCleanup } from "solid-js";
import utils from "../../lib/utils";
import "./row.scss";
const Row: Component = (props: any) => {
  let row: HTMLDivElement = null;
  let content: HTMLDivElement = null;
  // signals
  const [isOverflowing, setIsOverflowing] = createSignal<null | "both" | "left" | "right">(null);
  // private
  const checkOveflow = (scrollLeft?: number) => {
    scrollLeft = scrollLeft !== undefined ? scrollLeft : content.scrollLeft;
    if (!utils.isTouchDevice()) {
      let value = null;
      const contentOverflows = content.scrollWidth > content.clientWidth;
      if (contentOverflows) {
        const left = scrollLeft > 0; // se puede scrollar hacia la izquierda?
        const right = scrollLeft + content.clientWidth < content.scrollWidth; // se puede scrollar hacia la derecha?
        value = left && right ? "both" : left ? "left" : right ? "right" : null;
      }
      isOverflowing() !== value && setIsOverflowing(value);
    } else {
      return false;
    }
  };
  const scrollRow = (direction: 1 | -1) => {
    const items = content.querySelector(".m-row__items");
    const itemsCount = props.items.length || 1;
    if (items) {
      const width = items.scrollWidth / itemsCount;
      const scrollLeft = content.scrollLeft + direction * width;
      content.scrollLeft = scrollLeft;
      setTimeout(() => checkOveflow(scrollLeft < 0 ? 0 : Math.round(scrollLeft)));
    }
  };
  // lifecycle
  onMount(() => {
    window.addEventListener("resize", () => checkOveflow());
    setTimeout(checkOveflow);
  });
  onCleanup(() => {
    window.removeEventListener("resize", () => checkOveflow());
  });
  // component
  return (
    <div
      ref={row}
      class="m-row"
      data-index={props.index}
      data-rowimage={!!props.image && props.index !== 0}
      data-items={props.items?.length || 0}
      data-format={props.format}
      data-touch={utils.isTouchDevice()}
      data-overflow={isOverflowing()}
    >
      <div class="m-row__header">
        <h2>{props.title}</h2>
        <div class="m-row__arrows">
          <div class="left" onclick={() => scrollRow(-1)}></div>
          <div class="right" onclick={() => scrollRow(1)}></div>
        </div>
      </div>
      {props.image && props.index !== 0 ? (
        <img class="m-row__rowImage" src={utils.getImageUrl(SETTINGS.api_cdn_base_url, props.image)} />
      ) : null}
      {!props.image && props.index !== 0 ? <div class="m-row__rowImage" /> : null}
      <div class="m-row__content" ref={content}>
        <div id={`row-${props.index}`} class="m-row__items">
          {props.items.map((i, index) => {
            let teams = [];
            let image = i.image || SETTINGS.default_row_image_url;
            if (i.teams?.length === 2) {
              const local = i.teams[1].type === "local" ? i.teams[1] : i.teams[0];
              const away = i.teams[1] === local ? i.teams[0] : i.teams[1];
              teams = [local, away];
            }
            return (
              <div
                class="m-row__item focusable"
                data-selected={index === 0}
                data-parentindex={props.index}
                data-index={index}
                onClick={() => props.onVideoClick && props.onVideoClick(i)}
                onKeyDown={(ev) => {
                  const key = utils.getKey(ev);
                  props.onVideoClick && key === "Enter" && props.onVideoClick(i);
                }}
              >
                <div class="m-row__imgContainer">
                  <img
                    data-src={image}
                    onLoad={(ev) => ((ev.target as any).parentNode.dataset.loaded = "true")}
                    onError={(ev) => {
                      (ev.target as any).parentNode.dataset.loaded = "error";
                      (ev.target as any).closest(".focusable").style.backgroundImage = "none";
                    }}
                  />
                  {props.epgData && i.show_epg ? (
                    <div class="m-row__epgContainer">
                      <div class="m-row__epgTitle">{props.epgData.title}</div>
                      <div class="m-row__epgSubtitle">{props.epgData.subtitle}</div>
                    </div>
                  ) : null}
                </div>
                <div class="m-row__overlay">
                  {i.title || i.subtitle ? (
                    <div class="m-row__texts">
                      {i.start_date && new Date(i.end_date).getTime() > Date.now() ? (
                        <div class="m-row__title date" innerHTML={utils.rowDate(i.start_date, i.end_date)}></div>
                      ) : i.title ? (
                        <div class="m-row__title">{i.title}</div>
                      ) : null}
                      {i.subtitle ? <div class="m-row__subtitle">{i.subtitle}</div> : null}
                    </div>
                  ) : null}
                  {teams.length === 2 ? (
                    <div class="m-row__teams">
                      <div class="m-row__team">
                        {teams[0].image ? (
                          <img
                            src={utils.getImageUrl(SETTINGS.api_cdn_base_url, teams[0].image)}
                            onError={(ev) => ev?.target?.style && (ev.target.style.visibility = "hidden")}
                          />
                        ) : null}
                        <span>{teams[0].name}</span>
                      </div>
                      <div class="m-row__team">
                        {teams[0].image ? (
                          <img
                            src={utils.getImageUrl(SETTINGS.api_cdn_base_url, teams[1].image)}
                            onError={(ev) => ev?.target?.style && (ev.target.style.visibility = "hidden")}
                          />
                        ) : null}
                        <span>{teams[1].name}</span>
                      </div>
                    </div>
                  ) : null}
                  {props.format === "portrait" ? (
                    <div class="m-row__buttons">
                      <button
                        class="button"
                        onclick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          props.onVideoClick && props.onVideoClick(i);
                        }}
                      >
                        Ver vídeo
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Row;
