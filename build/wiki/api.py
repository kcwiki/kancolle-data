# wrap https://en.kancollewiki.net using https://github.com/vercel-labs/agent-browser
#
# run as python api.py --new, make sure to login, pass captchas, etc.
#
# then use http://localhost:6767 for api, etc.

import json
import sys
import time
from http.server import BaseHTTPRequestHandler, HTTPServer
from subprocess import DEVNULL, Popen, run


def simple_run(cmd, repeat=False):
    while True:
        r = run(cmd.split(" "), capture_output=True)
        err = r.stderr.decode().strip()
        if err:
            print(err)
        out = r.stdout.decode().strip()
        if out:
            print(out)
        if not repeat or r.returncode == 0:
            break
        time.sleep(1)
    return out


def start_browser():

    print("starting chromium...")

    run("kill $(lsof -ti:9222)", shell=True)

    Popen(
        "chromium --remote-debugging-port=9222".split(),
        stdout=DEVNULL,
        stderr=DEVNULL,
        start_new_session=True,
    )

    while True:
        if simple_run("lsof -ti:9222"):
            break

    time.sleep(10)

    print("connecting agent-browser...")

    simple_run("agent-browser connect 9222", repeat=True)

    print("opening page...")

    home_page = "https://en.kancollewiki.net/Kancolle_Wiki"
    while home_page != simple_run("agent-browser get url"):
        simple_run(f"agent-browser open {home_page}")


if len(sys.argv) > 1 and sys.argv[1] == "--new":
    start_browser()


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        url = f"https://en.kancollewiki.net{self.path}"
        fetch_js = "(async (url) => await (await fetch(url)).text())(__URL__)"
        payload = fetch_js.replace("__URL__", f'"{url}"')
        r = run(["agent-browser", "eval", payload], capture_output=True)
        data = json.loads(r.stdout.decode().strip())
        self.send_response(200)
        # self.send_header("content-type", "application/json")
        self.end_headers()
        self.wfile.write(data.encode())


print("running server...")

HTTPServer(("0.0.0.0", 6767), Handler).serve_forever()
