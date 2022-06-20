from github import Github
import sys

# or using an access token
g = Github(sys.argv[2])

repo = g.get_repo("dpastopu-nttdata/DevOpp-gitaction")
pull = repo.get_pull(int(sys.argv[1]))
pull.set_labels(sys.argv[3])