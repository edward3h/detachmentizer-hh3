function formatBuildTimestamp(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function renderFooter(): string {
  const buildTime = formatBuildTimestamp(__BUILD_TIMESTAMP__);

  return `
    <footer class="app-footer">
      <p>Detachmentizer HH3 - Unofficial army builder helper</p>
      <p>Warhammer: The Horus Heresy is &copy; Games Workshop Ltd.</p>
      <p>This tool is not affiliated with Games Workshop.</p>
      <p><a href="https://github.com/edward3h/detachmentizer-hh3/issues" target="_blank" rel="noopener noreferrer">Report an issue or request a feature</a></p>
      <p class="build-info">Built: ${buildTime}</p>
    </footer>
  `;
}
