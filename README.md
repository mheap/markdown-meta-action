# Markdown Meta

Read front-matter from Markdown files

## Usage

```yaml
name: Markdown Meta
on: push
jobs:
  markdown-meta:
    name: Markdown Meta
    runs-on: ubuntu-latest
    steps:
      - name: Markdown Meta
        uses: mheap/markdown-meta-action@v1
        id: meta
        with:
          file: ./my-post.md
      - name: Use the value
        run: echo "${{ steps.meta.output.title }}"
```

## Available Configuration

### Inputs

| Name   | Description                |
| ------ | -------------------------- |
| `file` | The markdown file to parse |
