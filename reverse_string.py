def reverse_string(s: str) -> str:
    """Return the reverse of the input string.

    Examples:
        >>> reverse_string("hello")
        'olleh'
    """
    return s[::-1]

if __name__ == "__main__":
    import argparse
    import sys

    parser = argparse.ArgumentParser(description="Reverse a string.")
    parser.add_argument(
        "text",
        nargs="?",
        help="String to reverse. If omitted, reads from stdin.",
    )
    args = parser.parse_args()

    input_text = args.text if args.text is not None else sys.stdin.read()
    print(reverse_string(input_text))
