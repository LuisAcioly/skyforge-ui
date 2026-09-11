import { STORY_RENDERED } from "storybook/internal/core-events";
import { addons } from "storybook/preview-api";
import { beforeEach } from "vitest";

// storybook-addon-pseudo-states rewrites :hover / :focus-visible rules when the
// Storybook UI announces a render. The Vitest runner renders stories without
// that event, so announce it before each story to get the same forced states.
beforeEach(() => {
  addons.getChannel().emit(STORY_RENDERED);
});
