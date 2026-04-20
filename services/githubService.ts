import { GithubRelease } from "../types";

const GITHUB_API_BASE = "https://api.github.com/repos";

export const checkUpdate = async (repoOwner: string, repoName: string): Promise<GithubRelease | null> => {
  try {
    // Fetch list of releases (including pre-releases/experimental) sorted by date
    // ?per_page=1 gets the absolute latest tag
    const response = await fetch(`${GITHUB_API_BASE}/${repoOwner}/${repoName}/releases?per_page=1`);
    if (!response.ok) {
      throw new Error("Failed to fetch release info");
    }
    const data = await response.json();
    
    // API returns an array, take the first item
    const latestRelease = Array.isArray(data) ? data[0] : null;

    if (!latestRelease) return null;

    return {
      tag_name: latestRelease.tag_name,
      html_url: latestRelease.html_url,
      prerelease: latestRelease.prerelease === true,
    };
  } catch (error) {
    console.error(`Error checking update for ${repoName}:`, error);
    return null;
  }
};