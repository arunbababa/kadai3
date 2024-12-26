# Define the deploy target
.PHONY: deploy
deploy:
	npm run build
	firebase deploy

# test target
.PHONY: test
test:
	npm run test
