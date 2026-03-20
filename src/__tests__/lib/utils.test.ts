import { describe, it, expect } from "vitest";
import { cn, formatDate, getParamFromHref } from "@/lib/utils";

describe("cn", () => {
  it("should merge class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("should handle conflicting tailwind classes", () => {
    expect(cn("px-4", "px-2")).toBe("px-2");
  });

  it("should handle conditional classes", () => {
    expect(cn("base", false && "hidden", "flex")).toBe("base flex");
  });
});

describe("formatDate", () => {
  it("should format date in Korean", () => {
    const result = formatDate("2025-01-15");
    expect(result).toContain("2025");
    expect(result).toContain("1");
    expect(result).toContain("15");
  });
});

describe("getParamFromHref", () => {
  it("should extract query parameter", () => {
    expect(getParamFromHref("category", "/blog?category=Frontend")).toBe(
      "Frontend"
    );
  });

  it("should return empty string for missing param", () => {
    expect(getParamFromHref("tag", "/blog?category=Frontend")).toBe("");
  });

  it("should handle multiple params", () => {
    expect(
      getParamFromHref("tag", "/blog?category=Frontend&tag=React")
    ).toBe("React");
  });

  it("should decode URI components", () => {
    expect(
      getParamFromHref("q", "/search?q=%ED%95%9C%EA%B8%80")
    ).toBe("한글");
  });
});
