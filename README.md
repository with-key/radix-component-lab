# Radix UI

- Scoped Context 문제 해결
- Compound pattern components

# Stitches/react

- APIs

  - createStitches

    - utils
      ```tsx
        utils: {
            marginX: (value: string) => ({ marginLeft: value, marginRight: value }),
        },
      ```
    - theme

      ```tsx
        theme: {
            colors: {
            gray400: "gainsboro",
            gray500: "lightgray",
            },
        },
      ```

  - Locally scoped tokens
    ```tsx
    const Button = styled("button", {
      $$shadowColor: "red",
      boxShadow: "0 0 0 15px $$shadowColor",
    });
    ```
  - As Prop
    ```tsx
    <Button as="a" href="https://github.com/stitchesjs/stitches">
      GitHub
    </Button>
    ```
  - variants
