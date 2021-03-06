#!/usr/bin/env python3

import os, sys
from app import run_app

from db.dbinit import start_db 

def main(host='127.0.0.1', port=None):
    try:
        start_db()
        run(host, port)
    except ImportError as e:
        print('ERROR:', e, file=sys.stderr)
        if sys.version_info < (3, 6):
            print('The backend requires Python 3.6 or later - you appear to be using Python {}.{}'.format(
                *sys.version_info), file=sys.stderr)
        else:
            print('A module required by the backend is missing.', file=sys.stderr)
            print('See the instructions in backend/README.md or ask me.', file=sys.stderr)
        sys.exit(1)


def run(host, port):
    if port is not None:
        run_flask(host, port)
    else:
        for port in range(5000, 5100):
            try:
                run_flask(host, port)
                break
            except OSError as e:
                if 'Address in use' in str(e):
                    continue


def run_flask(host, port):
    from app import app
    import routes.suggest
    import routes.details
    import routes.routing
    import routes.auth
    import routes.trip
    import routes.user
    import routes.export

    # Set environment
    os.environ['HOST'] = host
    os.environ['PORT'] = str(port)

    # app.run(debug=True, host=host, port=port)
    # Use SocketIO here to wrap around app
    run_app(host=host, port=port)

def usage():
    print('Usage:', sys.argv[0], '[host]', '[port]')
    print('or:', sys.argv[0], '[port]')
    print('or:', sys.argv[0])


if __name__ == "__main__":
    try:
        if len(sys.argv) == 3:
            main(host = sys.argv[1], port = int(sys.argv[2]))
        elif len(sys.argv) == 2:
            main(port = int(sys.argv[1]))
        elif len(sys.argv) == 1:
            main()
        else:
            usage()
    except:
        print("Something bad happened. Try debugging.")
        print("This happened to me before. Possible causes:")
        print(" - unfinished util/models.py file")
        print(" - just saved a file (server doesn't support hotload)")
        print(" - not updated config.py (should match the fields inside config.example)")
        print(" - incomplete package: `pip install -r requirements.txt`")
        usage()
