# Failed tests of a Playwright JSON report as [{kind, project, title, detail}].
# kind is "diff" when every error is a snapshot mismatch, "error" otherwise.
#   jq -f vrt/failures.jq test-results/vrt.json

def clean: gsub("\u001b\\[[0-9;]*m"; "");

# A capture that never got stable or timed out is an error, not a difference.
def kind:
  if test("(toHaveScreenshot|toMatchSnapshot)\\(expected\\) failed")
    and (test("Failed to take two consecutive stable screenshots|\nTimeout: [0-9]+ms") | not)
  then "diff"
  else "error"
  end;

# One line per error: the snapshot file, then the pixel count, the changed
# lines of a text snapshot, or the start of the message. The call log, code
# frame and stack are dropped.
def detail:
  (split("\n") | map(sub("^\\s+"; "")) | map(select(length > 0))) as $all
  | ($all | map(test("^Call log:|^(> ?)?[0-9]+ \\||^at ")) | index(true)) as $end
  | $all[0:$end] as $lines
  | ($lines | map(select(startswith("Snapshot: "))
      | ltrimstr("Snapshot: ") | split("/") | last) | first) as $file
  | if test("toMatchSnapshot\\(expected\\) failed") and (test("pixels \\(ratio") | not)
    then $lines | map(select(test("^[-+][^-+ ]"))) | join(" ")
    else ($lines | map(select(test("^Expected an image|pixels \\(ratio|^Failed to take"))) | first)
      // ($lines[0:4] | join(" ") | sub("^Error: "; ""))
    end
  | if $file then "\($file): \(.)" else . end
  | .[0:300];

[
  ..
  | objects
  | select(has("specs"))
  | .specs[]
  | .title as $title
  | .tests[]
  | select(.status == "unexpected")
  | [(.results | last | .errors // [])[] | .message // "" | clean] as $messages
  | {
      kind: (
        if ($messages | length) > 0 and all($messages[]; kind == "diff")
        then "diff"
        else "error"
        end
      ),
      project: .projectName,
      title: $title,
      detail: ($messages | map(detail) | join(" / "))
    }
]
